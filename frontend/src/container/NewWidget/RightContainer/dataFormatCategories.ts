import { DefaultOptionType } from 'antd/es/select';
import { flattenDeep } from 'lodash-es';

import {
	AccelerationFormats,
	AngularFormats,
	AreaFormats,
	BooleanFormats,
	Category,
	CategoryNames,
	ConcentrationFormats,
	CurrencyFormats,
	DataFormats,
	DataRateFormats,
	DataTypeCategories,
	DatetimeFormats,
	FlopsFormats,
	FlowFormats,
	ForceFormats,
	HashRateFormats,
	LengthFormats,
	MassFormats,
	MiscellaneousFormats,
	PowerElectricalFormats,
	PressureFormats,
	RadiationFormats,
	RotationSpeedFormats,
	TemperatureFormats,
	ThroughputFormats,
	TimeFormats,
	VelocityFormats,
	VolumeFormats,
} from './types';

export const dataTypeCategories: DataTypeCategories = [
	{
		name: CategoryNames.Time,
		formats: [
			{ name: 'Hertz (1/s)', id: TimeFormats.Hertz },
			{ name: 'nanoseconds (ns)', id: TimeFormats.Nanoseconds },
			{ name: 'microseconds (µs)', id: TimeFormats.Microseconds },
			{ name: 'milliseconds (ms)', id: TimeFormats.Milliseconds },
			{ name: 'seconds (s)', id: TimeFormats.Seconds },
			{ name: 'minutes (m)', id: TimeFormats.Minutes },
			{ name: 'hours (h)', id: TimeFormats.Hours },
			{ name: 'days (d)', id: TimeFormats.Days },
			{ name: 'duration in ms (dtdurationms)', id: TimeFormats.DurationMs },
			{ name: 'duration in s (dtdurations)', id: TimeFormats.DurationS },
			{ name: 'duration in h:m:s (dthms)', id: TimeFormats.DurationHms },
			{ name: 'duration in d:h:m:s (dtdhms)', id: TimeFormats.DurationDhms },
			{ name: 'timeticks (timeticks)', id: TimeFormats.Timeticks },
			{ name: 'clock in ms (clockms)', id: TimeFormats.ClockMs },
			{ name: 'clock in s (clocks)', id: TimeFormats.ClockS },
		],
	},
	{
		name: CategoryNames.Throughput,
		formats: [
			{ name: 'counts/sec (cps)', id: ThroughputFormats.CountsPerSec },
			{ name: 'ops/sec (ops)', id: ThroughputFormats.OpsPerSec },
			{ name: 'requests/sec (reqps)', id: ThroughputFormats.RequestsPerSec },
			{ name: 'reads/sec (rps)', id: ThroughputFormats.ReadsPerSec },
			{ name: 'writes/sec (wps)', id: ThroughputFormats.WritesPerSec },
			{ name: 'I/O operations/sec (iops)', id: ThroughputFormats.IOOpsPerSec },
			{ name: 'counts/min (cpm)', id: ThroughputFormats.CountsPerMin },
			{ name: 'ops/min (opm)', id: ThroughputFormats.OpsPerMin },
			{ name: 'reads/min (rpm)', id: ThroughputFormats.ReadsPerMin },
			{ name: 'writes/min (wpm)', id: ThroughputFormats.WritesPerMin },
		],
	},
	{
		name: CategoryNames.Data,
		formats: [
			{ name: 'bytes(IEC)', id: DataFormats.BytesIEC },
			{ name: 'bytes(SI)', id: DataFormats.BytesSI },
			{ name: 'bits(IEC)', id: DataFormats.BitsIEC },
			{ name: 'bits(SI)', id: DataFormats.BitsSI },
			{ name: 'kibibytes', id: DataFormats.KibiBytes },
			{ name: 'kilobytes', id: DataFormats.KiloBytes },
			{ name: 'mebibytes', id: DataFormats.MebiBytes },
			{ name: 'megabytes', id: DataFormats.MegaBytes },
			{ name: 'gibibytes', id: DataFormats.GibiBytes },
			{ name: 'gigabytes', id: DataFormats.GigaBytes },
			{ name: 'tebibytes', id: DataFormats.TebiBytes },
			{ name: 'terabytes', id: DataFormats.TeraBytes },
			{ name: 'pebibytes', id: DataFormats.PebiBytes },
			{ name: 'petabytes', id: DataFormats.PetaBytes },
		],
	},
	{
		name: CategoryNames.DataRate,
		formats: [
			{ name: 'packets/sec', id: DataRateFormats.PacketsPerSec },
			{ name: 'bytes/sec(IEC)', id: DataRateFormats.BytesPerSecIEC },
			{ name: 'bytes/sec(SI)', id: DataRateFormats.BytesPerSecSI },
			{ name: 'bits/sec(IEC)', id: DataRateFormats.BitsPerSecIEC },
			{ name: 'bits/sec(SI)', id: DataRateFormats.BitsPerSecSI },
			{ name: 'kibibytes/sec', id: DataRateFormats.KibiBytesPerSec },
			{ name: 'kibibits/sec', id: DataRateFormats.KibiBitsPerSec },
			{ name: 'kilobytes/sec', id: DataRateFormats.KiloBytesPerSec },
			{ name: 'kilobits/sec', id: DataRateFormats.KiloBitsPerSec },
			{ name: 'mebibytes/sec', id: DataRateFormats.MebiBytesPerSec },
			{ name: 'mebibits/sec', id: DataRateFormats.MebiBitsPerSec },
			{ name: 'megabytes/sec', id: DataRateFormats.MegaBytesPerSec },
			{ name: 'megabits/sec', id: DataRateFormats.MegaBitsPerSec },
			{ name: 'gibibytes/sec', id: DataRateFormats.GibiBytesPerSec },
			{ name: 'gibibits/sec', id: DataRateFormats.GibiBitsPerSec },
			{ name: 'gigabytes/sec', id: DataRateFormats.GigaBytesPerSec },
			{ name: 'gigabits/sec', id: DataRateFormats.GigaBitsPerSec },
			{ name: 'tebibytes/sec', id: DataRateFormats.TebiBytesPerSec },
			{ name: 'tebibits/sec', id: DataRateFormats.TebiBitsPerSec },
			{ name: 'terabytes/sec', id: DataRateFormats.TeraBytesPerSec },
			{ name: 'terabits/sec', id: DataRateFormats.TeraBitsPerSec },
			{ name: 'pebibytes/sec', id: DataRateFormats.PebiBytesPerSec },
			{ name: 'pebibits/sec', id: DataRateFormats.PebiBitsPerSec },
			{ name: 'petabytes/sec', id: DataRateFormats.PetaBytesPerSec },
			{ name: 'petabits/sec', id: DataRateFormats.PetaBitsPerSec },
		],
	},
	{
		name: CategoryNames.HashRate,
		formats: [
			{ name: 'hashes/sec', id: HashRateFormats.HashesPerSec },
			{ name: 'kilohashes/sec', id: HashRateFormats.KiloHashesPerSec },
			{ name: 'megahashes/sec', id: HashRateFormats.MegaHashesPerSec },
			{ name: 'gigahashes/sec', id: HashRateFormats.GigaHashesPerSec },
			{ name: 'terahashes/sec', id: HashRateFormats.TeraHashesPerSec },
			{ name: 'petahashes/sec', id: HashRateFormats.PetaHashesPerSec },
			{ name: 'exahashes/sec', id: HashRateFormats.ExaHashesPerSec },
		],
	},
	{
		name: CategoryNames.Miscellaneous,
		formats: [
			{ name: 'none', id: MiscellaneousFormats.None },
			{ name: 'String', id: MiscellaneousFormats.String },
			{ name: 'short', id: MiscellaneousFormats.Short },
			{ name: 'Percent (0-100)', id: MiscellaneousFormats.Percent },
			{ name: 'Percent (0.0-1.0)', id: MiscellaneousFormats.PercentUnit },
			{ name: 'Humidity (%H)', id: MiscellaneousFormats.Humidity },
			{ name: 'Decibel', id: MiscellaneousFormats.Decibel },
			{ name: 'Hexadecimal (0x)', id: MiscellaneousFormats.Hexadecimal0x },
			{ name: 'Hexadecimal', id: MiscellaneousFormats.Hexadecimal },
			{ name: 'Scientific notation', id: MiscellaneousFormats.ScientificNotation },
			{ name: 'Locale format', id: MiscellaneousFormats.LocaleFormat },
			{ name: 'Pixels', id: MiscellaneousFormats.Pixels },
		],
	},
	{
		name: CategoryNames.Acceleration,
		formats: [
			{ name: 'Meters/sec²', id: AccelerationFormats.MetersPerSecondSquared },
			{ name: 'Feet/sec²', id: AccelerationFormats.FeetPerSecondSquared },
			{ name: 'G unit', id: AccelerationFormats.GUnit },
		],
	},
	{
		name: CategoryNames.Angle,
		formats: [
			{ name: 'Degrees (°)', id: AngularFormats.Degree },
			{ name: 'Radians', id: AngularFormats.Radian },
			{ name: 'Gradian', id: AngularFormats.Gradian },
			{ name: 'Arc Minutes', id: AngularFormats.ArcMinute },
			{ name: 'Arc Seconds', id: AngularFormats.ArcSecond },
		],
	},
	{
		name: CategoryNames.Area,
		formats: [
			{ name: 'Square Meters (m²)', id: AreaFormats.SquareMeters },
			{ name: 'Square Feet (ft²)', id: AreaFormats.SquareFeet },
			{ name: 'Square Miles (mi²)', id: AreaFormats.SquareMiles },
		],
	},
	{
		name: CategoryNames.Computation,
		formats: [
			{ name: 'FLOP/s', id: FlopsFormats.FLOPs },
			{ name: 'MFLOP/s', id: FlopsFormats.MFLOPs },
			{ name: 'GFLOP/s', id: FlopsFormats.GFLOPs },
			{ name: 'TFLOP/s', id: FlopsFormats.TFLOPs },
			{ name: 'PFLOP/s', id: FlopsFormats.PFLOPs },
			{ name: 'EFLOP/s', id: FlopsFormats.EFLOPs },
			{ name: 'ZFLOP/s', id: FlopsFormats.ZFLOPs },
			{ name: 'YFLOP/s', id: FlopsFormats.YFLOPs },
		],
	},
	{
		name: CategoryNames.Concentration,
		formats: [
			{ name: 'parts-per-million (ppm)', id: ConcentrationFormats.PPM },
			{ name: 'parts-per-billion (ppb)', id: ConcentrationFormats.PPB },
			{ name: 'nanogram per cubic meter (ng/m³)', id: ConcentrationFormats.NgM3 },
			{
				name: 'nanogram per normal cubic meter (ng/Nm³)',
				id: ConcentrationFormats.NgNM3,
			},
			{ name: 'microgram per cubic meter (μg/m³)', id: ConcentrationFormats.UgM3 },
			{
				name: 'microgram per normal cubic meter (μg/Nm³)',
				id: ConcentrationFormats.UgNM3,
			},
			{ name: 'milligram per cubic meter (mg/m³)', id: ConcentrationFormats.MgM3 },
			{
				name: 'milligram per normal cubic meter (mg/Nm³)',
				id: ConcentrationFormats.MgNM3,
			},
			{ name: 'gram per cubic meter (g/m³)', id: ConcentrationFormats.GM3 },
			{
				name: 'gram per normal cubic meter (g/Nm³)',
				id: ConcentrationFormats.GNM3,
			},
			{ name: 'milligrams per decilitre (mg/dL)', id: ConcentrationFormats.MgDL },
			{ name: 'millimoles per litre (mmol/L)', id: ConcentrationFormats.MmolL },
		],
	},
	{
		name: CategoryNames.Currency,
		formats: [
			{ name: 'Dollars ($)', id: CurrencyFormats.USD },
			{ name: 'Pounds (£)', id: CurrencyFormats.GBP },
			{ name: 'Euro (€)', id: CurrencyFormats.EUR },
			{ name: 'Yen (¥)', id: CurrencyFormats.JPY },
			{ name: 'Rubles (₽)', id: CurrencyFormats.RUB },
			{ name: 'Hryvnias (₴)', id: CurrencyFormats.UAH },
			{ name: 'Real (R$)', id: CurrencyFormats.BRL },
			{ name: 'Danish Krone (kr)', id: CurrencyFormats.DKK },
			{ name: 'Icelandic Króna (kr)', id: CurrencyFormats.ISK },
			{ name: 'Norwegian Krone (kr)', id: CurrencyFormats.NOK },
			{ name: 'Swedish Krona (kr)', id: CurrencyFormats.SEK },
			{ name: 'Czech koruna (czk)', id: CurrencyFormats.CZK },
			{ name: 'Swiss franc (CHF)', id: CurrencyFormats.CHF },
			{ name: 'Polish Złoty (PLN)', id: CurrencyFormats.PLN },
			{ name: 'Bitcoin (฿)', id: CurrencyFormats.BTC },
			{ name: 'Milli Bitcoin (฿)', id: CurrencyFormats.MBTC },
			{ name: 'Micro Bitcoin (฿)', id: CurrencyFormats.UBTC },
			{ name: 'South African Rand (R)', id: CurrencyFormats.ZAR },
			{ name: 'Indian Rupee (₹)', id: CurrencyFormats.INR },
			{ name: 'South Korean Won (₩)', id: CurrencyFormats.KRW },
			{ name: 'Indonesian Rupiah (Rp)', id: CurrencyFormats.IDR },
			{ name: 'Philippine Peso (PHP)', id: CurrencyFormats.PHP },
			{ name: 'Vietnamese Dong (VND)', id: CurrencyFormats.VND },
		],
	},

	{
		name: CategoryNames.Datetime,
		formats: [
			{ name: 'Datetime ISO', id: DatetimeFormats.ISO },
			{
				name: 'Datetime ISO (No date if today)',
				id: DatetimeFormats.ISONoDateIfToday,
			},
			{ name: 'Datetime US', id: DatetimeFormats.US },
			{
				name: 'Datetime US (No date if today)',
				id: DatetimeFormats.USNoDateIfToday,
			},
			{ name: 'Datetime local', id: DatetimeFormats.Local },
			{
				name: 'Datetime local (No date if today)',
				id: DatetimeFormats.LocalNoDateIfToday,
			},
			{ name: 'Datetime default', id: DatetimeFormats.System },
			{ name: 'From Now', id: DatetimeFormats.FromNow },
		],
	},
	{
		name: CategoryNames.Energy,
		formats: [
			{ name: 'Watt (W)', id: PowerElectricalFormats.WATT },
			{ name: 'Kilowatt (kW)', id: PowerElectricalFormats.KWATT },
			{ name: 'Megawatt (MW)', id: PowerElectricalFormats.MEGWATT },
			{ name: 'Gigawatt (GW)', id: PowerElectricalFormats.GWATT },
			{ name: 'Milliwatt (mW)', id: PowerElectricalFormats.MWATT },
			{ name: 'Watt per square meter (W/m²)', id: PowerElectricalFormats.WM2 },
			{ name: 'Volt-Ampere (VA)', id: PowerElectricalFormats.VOLTAMP },
			{ name: 'Kilovolt-Ampere (kVA)', id: PowerElectricalFormats.KVOLTAMP },
			{
				name: 'Volt-Ampere reactive (VAr)',
				id: PowerElectricalFormats.VOLTAMPREACT,
			},
			{
				name: 'Kilovolt-Ampere reactive (kVAr)',
				id: PowerElectricalFormats.KVOLTAMPREACT,
			},
			{ name: 'Watt-hour (Wh)', id: PowerElectricalFormats.WATTH },
			{
				name: 'Watt-hour per Kilogram (Wh/kg)',
				id: PowerElectricalFormats.WATTHPERKG,
			},
			{ name: 'Kilowatt-hour (kWh)', id: PowerElectricalFormats.KWATTH },
			{ name: 'Kilowatt-min (kWm)', id: PowerElectricalFormats.KWATTM },
			{ name: 'Ampere-hour (Ah)', id: PowerElectricalFormats.AMPH },
			{ name: 'Kiloampere-hour (kAh)', id: PowerElectricalFormats.KAMPH },
			{ name: 'Milliampere-hour (mAh)', id: PowerElectricalFormats.MAMPH },
			{ name: 'Joule (J)', id: PowerElectricalFormats.JOULE },
			{ name: 'Electron volt (eV)', id: PowerElectricalFormats.EV },
			{ name: 'Ampere (A)', id: PowerElectricalFormats.AMP },
			{ name: 'Kiloampere (kA)', id: PowerElectricalFormats.KAMP },
			{ name: 'Milliampere (mA)', id: PowerElectricalFormats.MAMP },
			{ name: 'Volt (V)', id: PowerElectricalFormats.VOLT },
			{ name: 'Kilovolt (kV)', id: PowerElectricalFormats.KVOLT },
			{ name: 'Millivolt (mV)', id: PowerElectricalFormats.MVOLT },
			{ name: 'Decibel-milliwatt (dBm)', id: PowerElectricalFormats.DBM },
			{ name: 'Ohm (Ω)', id: PowerElectricalFormats.OHM },
			{ name: 'Kiloohm (kΩ)', id: PowerElectricalFormats.KOHM },
			{ name: 'Megaohm (MΩ)', id: PowerElectricalFormats.MOHM },
			{ name: 'Farad (F)', id: PowerElectricalFormats.FARAD },
			{ name: 'Microfarad (µF)', id: PowerElectricalFormats.µFARAD },
			{ name: 'Nanofarad (nF)', id: PowerElectricalFormats.NFARAD },
			{ name: 'Picofarad (pF)', id: PowerElectricalFormats.PFARAD },
			{ name: 'Femtofarad (fF)', id: PowerElectricalFormats.FFARAD },
			{ name: 'Henry (H)', id: PowerElectricalFormats.HENRY },
			{ name: 'Millihenry (mH)', id: PowerElectricalFormats.MHENRY },
			{ name: 'Microhenry (µH)', id: PowerElectricalFormats.µHENRY },
			{ name: 'Lumens (Lm)', id: PowerElectricalFormats.LUMENS },
		],
	},
	{
		name: CategoryNames.Flow,
		formats: [
			{ name: 'Gallons/min (gpm)', id: FlowFormats.FLOWGPM },
			{ name: 'Cubic meters/sec (cms)', id: FlowFormats.FLOWCMS },
			{ name: 'Cubic feet/sec (cfs)', id: FlowFormats.FLOWCFS },
			{ name: 'Cubic feet/min (cfm)', id: FlowFormats.FLOWCFM },
			{ name: 'Litre/hour', id: FlowFormats.LITREH },
			{ name: 'Litre/min (L/min)', id: FlowFormats.FLOWLPM },
			{ name: 'milliLitre/min (mL/min)', id: FlowFormats.FLOWMLPM },
			{ name: 'Lux (lx)', id: FlowFormats.LUX },
		],
	},
	{
		name: CategoryNames.Force,
		formats: [
			{ name: 'Newton-meters (Nm)', id: ForceFormats.FORCENM },
			{ name: 'Kilonewton-meters (kNm)', id: ForceFormats.FORCEKNM },
			{ name: 'Newtons (N)', id: ForceFormats.FORCEN },
			{ name: 'Kilonewtons (kN)', id: ForceFormats.FORCEKN },
		],
	},
	{
		name: CategoryNames.Mass,
		formats: [
			{ name: 'milligram (mg)', id: MassFormats.MASSMG },
			{ name: 'gram (g)', id: MassFormats.MASSG },
			{ name: 'pound (lb)', id: MassFormats.MASSLB },
			{ name: 'kilogram (kg)', id: MassFormats.MASSKG },
			{ name: 'metric ton (t)', id: MassFormats.MASST },
		],
	},
	{
		name: CategoryNames.Length,
		formats: [
			{ name: 'millimeter (mm)', id: LengthFormats.LENGTHMM },
			{ name: 'inch (in)', id: LengthFormats.LENGTHIN },
			{ name: 'feet (ft)', id: LengthFormats.LENGTHFT },
			{ name: 'meter (m)', id: LengthFormats.LENGTHM },
			{ name: 'kilometer (km)', id: LengthFormats.LENGTHKM },
			{ name: 'mile (mi)', id: LengthFormats.LENGTHMI },
		],
	},
	{
		name: CategoryNames.Pressure,
		formats: [
			{ name: 'Millibars', id: PressureFormats.PRESSUREMBAR },
			{ name: 'Bars', id: PressureFormats.PRESSUREBAR },
			{ name: 'Kilobars', id: PressureFormats.PRESSUREKBAR },
			{ name: 'Pascals', id: PressureFormats.PRESSUREPA },
			{ name: 'Hectopascals', id: PressureFormats.PRESSUREHPA },
			{ name: 'Kilopascals', id: PressureFormats.PRESSUREKPA },
			{ name: 'Inches of mercury', id: PressureFormats.PRESSUREHG },
			{ name: 'PSI', id: PressureFormats.PRESSUREPSI },
		],
	},
	{
		name: CategoryNames.Radiation,
		formats: [
			{ name: 'Becquerel (Bq)', id: RadiationFormats.RADBQ },
			{ name: 'curie (Ci)', id: RadiationFormats.RADCI },
			{ name: 'Gray (Gy)', id: RadiationFormats.RADGY },
			{ name: 'rad', id: RadiationFormats.RADRAD },
			{ name: 'Sievert (Sv)', id: RadiationFormats.RADSV },
			{ name: 'milliSievert (mSv)', id: RadiationFormats.RADMSV },
			{ name: 'microSievert (µSv)', id: RadiationFormats.RADUSV },
			{ name: 'rem', id: RadiationFormats.RADREM },
			{ name: 'Exposure (C/kg)', id: RadiationFormats.RADEXPCKG },
			{ name: 'roentgen (R)', id: RadiationFormats.RADR },
			{ name: 'Sievert/hour (Sv/h)', id: RadiationFormats.RADSVH },
			{ name: 'milliSievert/hour (mSv/h)', id: RadiationFormats.RADMSVH },
			{ name: 'microSievert/hour (µSv/h)', id: RadiationFormats.RADUSVH },
		],
	},
	{
		name: CategoryNames.RotationSpeed,
		formats: [
			{ name: 'Revolutions per minute (rpm)', id: RotationSpeedFormats.ROTRPM },
			{ name: 'Hertz (Hz)', id: RotationSpeedFormats.ROTHZ },
			{ name: 'Radians per second (rad/s)', id: RotationSpeedFormats.ROTRADS },
			{ name: 'Degrees per second (°/s)', id: RotationSpeedFormats.ROTDEGS },
		],
	},
	{
		name: CategoryNames.Temperature,
		formats: [
			{ name: 'Celsius (°C)', id: TemperatureFormats.CELSIUS },
			{ name: 'Fahrenheit (°F)', id: TemperatureFormats.FAHRENHEIT },
			{ name: 'Kelvin (K)', id: TemperatureFormats.KELVIN },
		],
	},
	{
		name: CategoryNames.Velocity,
		formats: [
			{ name: 'meters/second (m/s)', id: VelocityFormats.METERS_PER_SECOND },
			{ name: 'kilometers/hour (km/h)', id: VelocityFormats.KILOMETERS_PER_HOUR },
			{ name: 'miles/hour (mph)', id: VelocityFormats.MILES_PER_HOUR },
			{ name: 'knot (kn)', id: VelocityFormats.KNOT },
		],
	},
	{
		name: CategoryNames.Volume,
		formats: [
			{ name: 'millilitre (mL)', id: VolumeFormats.MILLILITRE },
			{ name: 'litre (L)', id: VolumeFormats.LITRE },
			{ name: 'cubic meter', id: VolumeFormats.CUBIC_METER },
			{ name: 'Normal cubic meter', id: VolumeFormats.NORMAL_CUBIC_METER },
			{ name: 'cubic decimeter', id: VolumeFormats.CUBIC_DECIMETER },
			{ name: 'gallons', id: VolumeFormats.GALLONS },
		],
	},
	{
		name: CategoryNames.Boolean,
		formats: [
			{ name: 'True / False', id: BooleanFormats.TRUE_FALSE },
			{ name: 'Yes / No', id: BooleanFormats.YES_NO },
			{ name: 'On / Off', id: BooleanFormats.ON_OFF },
		],
	},
];

export const flattenedCategories = flattenDeep(
	dataTypeCategories.map((category) => category.formats),
);

export const getCategorySelectOptionByName = (
	name?: CategoryNames | string,
): DefaultOptionType[] =>
	dataTypeCategories
		.find((category) => category.name === name)
		?.formats.map((format) => ({
			label: format.name,
			value: format.id,
		})) || [];

export const getCategoryByOptionId = (id: string): Category | undefined =>
	dataTypeCategories.find((category) =>
		category.formats.some((format) => format.id === id),
	);

export const isCategoryName = (name: string): name is CategoryNames =>
	dataTypeCategories.some((category) => category.name === name);
