import { InjectionToken, inject } from '@angular/core';

import { DATA_CONFIG } from '../../../shared/constants/data-config';

import { NewsgroupValidityInfo } from '../models/newsgroup-validity-info';

export const NEWSGROUP_VALIDITY = new InjectionToken<NewsgroupValidityInfo>('newsgroup.validity', {
  providedIn: 'root',
  factory: () => {
    const valid = inject(DATA_CONFIG).valid;

    const hierarchy : Record<string,boolean> = {};
    const newsgroup : Record<string,boolean> = {};

    valid.forEach((name:string) => {
      if (name.endsWith('.ALL')) {
        hierarchy[name] = true;

      } else {
        newsgroup[name] = true;
      }
    });

    return { newsgroup, hierarchy };
  }
});
