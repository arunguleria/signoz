package querier

import (
	"context"
	"encoding/json"
	"sync"
	"time"

	logsV3 "go.signoz.io/signoz/pkg/query-service/app/logs/v3"
	metricsV3 "go.signoz.io/signoz/pkg/query-service/app/metrics/v3"
	tracesV3 "go.signoz.io/signoz/pkg/query-service/app/traces/v3"
	"go.signoz.io/signoz/pkg/query-service/cache/status"
	v3 "go.signoz.io/signoz/pkg/query-service/model/v3"
	"go.uber.org/zap"
)

func (q *querier) runBuilderQuery(
	ctx context.Context,
	builderQuery *v3.BuilderQuery,
	params *v3.QueryRangeParamsV3,
	keys map[string]v3.AttributeKey,
	cacheKeys map[string]string,
	ch chan channelResult,
	wg *sync.WaitGroup,
) {
	defer wg.Done()
	queryName := builderQuery.QueryName

	// TODO: handle other data sources
	if builderQuery.DataSource == v3.DataSourceLogs {
		query, err := logsV3.PrepareLogsQuery(params.Start, params.End, params.CompositeQuery.QueryType, params.CompositeQuery.PanelType, builderQuery)
		if err != nil {
			ch <- channelResult{Err: err, Name: queryName, Query: query, Series: nil}
			return
		}
		series, err := q.execClickHouseQuery(ctx, query)
		ch <- channelResult{Err: err, Name: queryName, Query: query, Series: series}
		return
	}

	if builderQuery.DataSource == v3.DataSourceTraces {
		query, err := tracesV3.PrepareTracesQuery(params.Start, params.End, params.CompositeQuery.QueryType, params.CompositeQuery.PanelType, builderQuery, keys)
		if err != nil {
			ch <- channelResult{Err: err, Name: queryName, Query: query, Series: nil}
			return
		}

		series, err := q.execClickHouseQuery(ctx, query)
		ch <- channelResult{Err: err, Name: queryName, Query: query, Series: series}
		return
	}

	// TODO(srikanthccv): ReduceTo avg should be handled; avg of avg is not correct
	// cache keys are generated based on the query type
	if _, ok := cacheKeys[queryName]; !ok {
		query, err := metricsV3.PrepareMetricQuery(params.Start, params.End, params.CompositeQuery.QueryType, params.CompositeQuery.PanelType, builderQuery)
		if err != nil {
			ch <- channelResult{Err: err, Name: queryName, Query: query, Series: nil}
			return
		}
		series, err := q.execClickHouseQuery(ctx, query)
		ch <- channelResult{Err: err, Name: queryName, Query: query, Series: series}
		return
	}

	cacheKey := cacheKeys[queryName]
	var cachedData []byte
	if !params.NoCache && q.cache != nil {
		var retrieveStatus status.RetrieveStatus
		data, retrieveStatus, err := q.cache.Retrieve(cacheKey, true)
		zap.L().Debug("cache retrieve status", zap.String("status", retrieveStatus.String()))
		if err == nil {
			cachedData = data
		}
	}
	misses := q.findMissingTimeRanges(params.Start, params.End, params.Step, cachedData)
	missedSeries := make([]*v3.Series, 0)
	cachedSeries := make([]*v3.Series, 0)
	for _, miss := range misses {
		query, err := metricsV3.PrepareMetricQuery(
			miss.start,
			miss.end,
			params.CompositeQuery.QueryType,
			params.CompositeQuery.PanelType,
			builderQuery,
		)
		if err != nil {
			ch <- channelResult{
				Err:    err,
				Name:   queryName,
				Query:  query,
				Series: nil,
			}
			return
		}
		series, err := q.execClickHouseQuery(ctx, query)
		if err != nil {
			ch <- channelResult{
				Err:    err,
				Name:   queryName,
				Query:  query,
				Series: nil,
			}
			return
		}
		missedSeries = append(missedSeries, series...)
	}
	if err := json.Unmarshal(cachedData, &cachedSeries); err != nil && cachedData != nil {
		zap.L().Error("error unmarshalling cached data", zap.Error(err))
	}
	mergedSeries := mergeSerieses(cachedSeries, missedSeries)

	ch <- channelResult{
		Err:    nil,
		Name:   queryName,
		Series: mergedSeries,
	}
	// Cache the seriesList for future queries
	if len(missedSeries) > 0 && !params.NoCache && q.cache != nil {
		mergedSeriesData, err := json.Marshal(mergedSeries)
		if err != nil {
			zap.L().Error("error marshalling merged series", zap.Error(err))
			return
		}
		err = q.cache.Store(cacheKey, mergedSeriesData, time.Hour)
		if err != nil {
			zap.L().Error("error storing merged series", zap.Error(err))
			return
		}
	}
}

func (q *querier) runBuilderExpression(
	ctx context.Context,
	builderQuery *v3.BuilderQuery,
	params *v3.QueryRangeParamsV3,
	keys map[string]v3.AttributeKey,
	cacheKeys map[string]string,
	ch chan channelResult,
	wg *sync.WaitGroup,
) {
	defer wg.Done()

	queryName := builderQuery.QueryName

	queries, err := q.builder.PrepareQueries(params, keys)
	if err != nil {
		ch <- channelResult{Err: err, Name: queryName, Query: "", Series: nil}
		return
	}

	if _, ok := cacheKeys[queryName]; !ok {
		query := queries[queryName]
		series, err := q.execClickHouseQuery(ctx, query)
		ch <- channelResult{Err: err, Name: queryName, Query: query, Series: series}
		return
	}

	cacheKey := cacheKeys[queryName]
	var cachedData []byte
	if !params.NoCache && q.cache != nil {
		var retrieveStatus status.RetrieveStatus
		data, retrieveStatus, err := q.cache.Retrieve(cacheKey, true)
		zap.L().Debug("cache retrieve status", zap.String("status", retrieveStatus.String()))
		if err == nil {
			cachedData = data
		}
	}
	misses := q.findMissingTimeRanges(params.Start, params.End, params.Step, cachedData)
	missedSeries := make([]*v3.Series, 0)
	cachedSeries := make([]*v3.Series, 0)
	for _, miss := range misses {
		missQueries, _ := q.builder.PrepareQueries(&v3.QueryRangeParamsV3{
			Start:          miss.start,
			End:            miss.end,
			Step:           params.Step,
			NoCache:        params.NoCache,
			CompositeQuery: params.CompositeQuery,
			Variables:      params.Variables,
		}, keys)
		query := missQueries[queryName]
		series, err := q.execClickHouseQuery(ctx, query)
		if err != nil {
			ch <- channelResult{Err: err, Name: queryName, Query: query, Series: nil}
			return
		}
		missedSeries = append(missedSeries, series...)
	}
	if err := json.Unmarshal(cachedData, &cachedSeries); err != nil && cachedData != nil {
		zap.L().Error("error unmarshalling cached data", zap.Error(err))
	}
	mergedSeries := mergeSerieses(cachedSeries, missedSeries)

	ch <- channelResult{
		Err:    nil,
		Name:   queryName,
		Series: mergedSeries,
	}
	// Cache the seriesList for future queries
	if len(missedSeries) > 0 && !params.NoCache && q.cache != nil {
		mergedSeriesData, err := json.Marshal(mergedSeries)
		if err != nil {
			zap.L().Error("error marshalling merged series", zap.Error(err))
			return
		}
		err = q.cache.Store(cacheKey, mergedSeriesData, time.Hour)
		if err != nil {
			zap.L().Error("error storing merged series", zap.Error(err))
			return
		}
	}
}
