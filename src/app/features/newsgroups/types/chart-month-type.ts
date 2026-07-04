import { HierarchyMonthType } from './hierarchy-month-type';
import { NewsgroupMonthType } from './newsgroup-month-type';

                             //  year,   month,  value
export type ChartMonthType = [ number, number, number|null ] | HierarchyMonthType | NewsgroupMonthType;
