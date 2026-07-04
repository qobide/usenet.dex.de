import { AtoZRangeInfo } from './atoz-range-info';

export interface AtoZItemInfo {
  name   : string;
  range  : AtoZRangeInfo;
  active : boolean;
  type 	 : string;
}
