import Big from 'big.js';
import {
	BooleanFormats,
	DataFormats,
	DataRateFormats,
	MiscellaneousFormats,
	ThroughputFormats,
	TimeFormats,
} from 'container/NewWidget/RightContainer/types';

import {
	dataFormatConfig,
	dataRateUnitsConfig,
	miscUnitsConfig,
	throughputConfig,
	timeUnitsConfig,
} from './config';

export function covertIntoDataFormats({
	value,
	sourceUnit,
	targetUnit,
}: IUnit): number {
	if (Object.values(BooleanFormats).includes(sourceUnit as BooleanFormats)) {
		return 1;
	}

	const sourceMultiplier =
		dataFormatConfig[sourceUnit as DataFormats] ||
		timeUnitsConfig[sourceUnit as TimeFormats] ||
		dataRateUnitsConfig[sourceUnit as DataRateFormats] ||
		miscUnitsConfig[sourceUnit as MiscellaneousFormats] ||
		throughputConfig[sourceUnit as ThroughputFormats];

	const targetDivider =
		dataFormatConfig[targetUnit as DataFormats] ||
		timeUnitsConfig[targetUnit as TimeFormats] ||
		dataRateUnitsConfig[targetUnit as DataRateFormats] ||
		miscUnitsConfig[targetUnit as MiscellaneousFormats] ||
		throughputConfig[sourceUnit as ThroughputFormats];

	const result = new Big(value)
		.times(sourceMultiplier || 0)
		.div(targetDivider || 0);

	return Number.isNaN(result) ? 0 : Number(result);
}

interface IUnit {
	value: number;
	sourceUnit?: string;
	targetUnit?: string;
}
