import { DataRangeMissingType } from '../types/data-range-missing-type';
import { DataRangeSourceType  } from '../types/data-range-source-type';

import { DataRangeMonthInfo   } from './data-range-month-info';

export interface DataRangeInfo {
  oldest : DataRangeMonthInfo;
  latest : DataRangeMonthInfo;

  missing? : DataRangeMissingType[];
  source?  : DataRangeSourceType[];
}
