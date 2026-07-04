import { HierarchyMonthType }  	from '../types/hierarchy-month-type';
import { HierarchyYearType  }  	from '../types/hierarchy-year-type';

import { AtoZRangeInfo }	from './atoz-range-info';
import { AtoZItemInfo }		from './atoz-item-info';

export interface HierarchyInfo {
  name   : string;
  range  : AtoZRangeInfo;
  active : boolean;
  type   : string;

  months : HierarchyMonthType[];
  years  : HierarchyYearType[];

  atoz	 : AtoZItemInfo[];
}
