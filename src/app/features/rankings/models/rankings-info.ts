import { DataRangeMonthInfo } from '../../../shared/models/data-range-month-info';

import { RankingItemInfo } from '../../../features/rankings/models/ranking-item-info';

export interface RankingsInfo {
  month : DataRangeMonthInfo;

  postings : RankingItemInfo[];
  winners  : RankingItemInfo[];
  losers   : RankingItemInfo[];
}
