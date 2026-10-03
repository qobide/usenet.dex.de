import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { CoreApiDataService } from '../../../core/apis/data-service';

import { RankingsInfo } from '../models/rankings-info';

export const rankingResolver: ResolveFn<RankingsInfo> = () => {
  return inject(CoreApiDataService).getObject<RankingsInfo>('rankings');
};
