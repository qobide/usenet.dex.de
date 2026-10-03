import { DataRangeMonthInfo } from '../../../shared/models/data-range-month-info';

import { RankingItemInfo } from '../../../features/rankings/models/ranking-item-info';

export interface RankingTop10Info {
  month : DataRangeMonthInfo;

  ranking? : RankingItemInfo[];
  winners? : RankingItemInfo[];
  losers?  : RankingItemInfo[];
}
