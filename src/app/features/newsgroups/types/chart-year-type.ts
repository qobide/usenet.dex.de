import { HierarchyYearType } from './hierarchy-year-type';
import { NewsgroupYearType } from './newsgroup-year-type';

                            //  year, value
export type ChartYearType = [ number, number|null ] | HierarchyYearType | NewsgroupYearType;
