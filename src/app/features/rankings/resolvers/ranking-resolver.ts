import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { CoreApiDataService } from '../../../core/apis/data-service';

import { RankingItemInfo } from '../models/ranking-item-info';

export const rankingResolver: ResolveFn<RankingItemInfo[]> = () => {
  return inject(CoreApiDataService).getArray<RankingItemInfo>('top10');
};
