import { DataRangeMonthInfo  } from '../models/data-range-month-info';

export type DataRangeSourceType = [
  DataRangeMonthInfo,	// from
  DataRangeMonthInfo,	// to
  string,		// origin
  string		// color
];
