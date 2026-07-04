import { NewsgroupMonthType } from '../types/newsgroup-month-type';
import { NewsgroupYearType  } from '../types/newsgroup-year-type';

import { AtoZRangeInfo } from './atoz-range-info';

export interface NewsgroupInfo {
  name   : string;
  range  : AtoZRangeInfo;
  active : boolean;
  type   : string;

  months : NewsgroupMonthType[];
  years  : NewsgroupYearType[];
}
