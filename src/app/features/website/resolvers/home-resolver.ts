import { inject }		from '@angular/core';
import { ResolveFn } 		from '@angular/router';

import { CoreApiDataService }	from '../../../core/apis/data-service';

import { HomeInfo } 		from '../models/home-info';

export const homeResolver: ResolveFn<HomeInfo> = () => {
  return inject(CoreApiDataService).getObject<HomeInfo>('home');
};
