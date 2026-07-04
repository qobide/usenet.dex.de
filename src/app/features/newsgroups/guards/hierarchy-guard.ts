import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { NEWSGROUP_VALIDITY } from '../constants/newsgroup-validity';

export const HierarchyGuard: CanMatchFn = (route, segments) => {
  const valid = inject(NEWSGROUP_VALIDITY);

  const name = String(segments[1].path);

  if (valid.hierarchy[name]) { return true; }

  const router = inject(Router);

  if (!name.endsWith('.ALL')) {
    return router.createUrlTree(['/newsgroup', name]);
  }

  return router.createUrlTree(['/atoz']);
};
