import { DataRangeInfo } from './data-range-info';

export interface DataConfigInfo {
  version : number;
  compiledAt : string;
  range : DataRangeInfo;
  valid : string[];
}
