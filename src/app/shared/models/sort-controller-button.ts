import { SortDirectionEnum } from '../constants/sort-direction-enum';

export interface SortControllerButton<T> {
  label : string,
  value : T,
  direction : SortDirectionEnum
}
