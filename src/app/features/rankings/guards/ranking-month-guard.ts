import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { DataRangeService } from '../../../shared/services/data-range-service';

export const RankingMonthGuard: CanMatchFn = (route, segments) => {
  const range = inject(DataRangeService);

  const year  = Number(segments[1].path);
  const month = Number(segments[2].path);

  const drm = range.dataRangeMonth({ year, month }, true);

  if (drm.valid) { return true; }

  const validMonth = range. nextBestDataRangeMonth(drm);
  if (!validMonth) { return false; }

  const router = inject(Router);

  return router.createUrlTree(['/ranking', validMonth.year, validMonth.month]);
};
