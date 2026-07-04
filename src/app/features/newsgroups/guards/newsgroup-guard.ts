import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { NEWSGROUP_VALIDITY } from '../constants/newsgroup-validity';

export const NewsgroupGuard: CanMatchFn = (route, segments) => {
  const valid = inject(NEWSGROUP_VALIDITY);

  const name:string = segments[1].path;

  if (valid.newsgroup[name]) { return true; }

  const router = inject(Router);

  if (name.endsWith('.ALL')) {
    return router.createUrlTree(['/hierarchy', name]);
  }

  return router.createUrlTree(['/atoz']);
};
