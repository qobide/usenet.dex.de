import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { RankingApiDataService } from '../apis/data-service';

import { RankingItemInfo } from '../models/ranking-item-info';

export const rankingMonthResolver: ResolveFn<RankingItemInfo[]> = (route) => {
  return inject(RankingApiDataService).getRanking(Number(route.params['year']), Number(route.params['month']));
};
