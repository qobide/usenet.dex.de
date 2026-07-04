import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { DataRangeService } from '../../../shared/services/data-range-service';

export const RankingYearGuard: CanMatchFn = (route, segments) => {
  const range = inject(DataRangeService);

  const year = Number(segments[1].path);

  if (range.validYear(year)) { return true; }

  const validYear = range.nextBestYear(year);
  if (!validYear) { return false; }

  const router = inject(Router);

  return router.createUrlTree(['/ranking', validYear]);
};
