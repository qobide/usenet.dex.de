import { DataRangeInfo } from './data-range-info';

export interface DataConfigInfo {
  version : number;
  range : DataRangeInfo;
  valid : string[];
}
