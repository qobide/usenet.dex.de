import { SortDirectionEnum } from '../constants/sort-direction-enum';

export interface SortControllerOption<T> {
  label : string,
  value : T,
  direction? : SortDirectionEnum
}
