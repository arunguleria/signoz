import type { ColumnsType, ColumnType } from 'antd/es/table';
import { generatorResizeTableColumns } from 'components/TableRenderer/utils';
import { ServicesList } from 'types/api/metrics/getService';

import { baseColumnOptions } from './BaseColumnOptions';
import { ColumnKey, ColumnTitle } from './ColumnContants';
import { getColumnSearchProps } from './GetColumnSearchProps';
import { ITableColumnProps } from './types';

export const getColumns = ({
	isMetricData,
	search,
	isPreferRPMDisabled,
}: ITableColumnProps): ColumnsType<ServicesList> => {
	const dynamicColumnOption: {
		key: string;
		columnOption: ColumnType<ServicesList>;
	}[] = [
		{
			key: ColumnKey.Application,
			columnOption: {
				...getColumnSearchProps('serviceName', search),
				title: ColumnTitle(isPreferRPMDisabled)[ColumnKey.Application],
			},
		},
		{
			key: ColumnKey.P99,
			columnOption: {
				title: `${ColumnTitle(isPreferRPMDisabled)[ColumnKey.P99]}${
					isMetricData ? ' (in ns)' : ' (in ms)'
				}`,
				sorter: (a: ServicesList, b: ServicesList): number => a.p99 - b.p99,
				render: (value: number): string => {
					if (Number.isNaN(value)) return '0.00';
					return isMetricData ? value.toFixed(2) : (value / 1000000).toFixed(2);
				},
			},
		},
		{
			key: ColumnKey.ErrorRate,
			columnOption: {
				sorter: (a: ServicesList, b: ServicesList): number =>
					a.errorRate - b.errorRate,
				render: (value: number): string => value.toFixed(2),
				title: ColumnTitle(isPreferRPMDisabled)[ColumnKey.ErrorRate],
			},
		},
		{
			key: ColumnKey.Operations,
			columnOption: {
				sorter: (a: ServicesList, b: ServicesList): number =>
					a.callRate - b.callRate,
				render: (value: number): string => value.toFixed(2),
				title: ColumnTitle(isPreferRPMDisabled)[ColumnKey.Operations],
			},
		},
	];

	return generatorResizeTableColumns<ServicesList>({
		baseColumnOptions,
		dynamicColumnOption,
	});
};
