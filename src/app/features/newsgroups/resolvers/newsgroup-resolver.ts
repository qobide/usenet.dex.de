import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { CoreApiDataService } from '../../../core/apis/data-service';

import { NewsgroupInfo } from '../models/newsgroup-info';

export const newsgroupResolver: ResolveFn<NewsgroupInfo> = (route) => {
  return inject(CoreApiDataService).getObject<NewsgroupInfo>(route.params['name']);
};
