import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { CoreApiDataService } from '../../../core/apis/data-service';

import { HierarchyInfo } from '../models/hierarchy-info';

export const hierarchyResolver: ResolveFn<HierarchyInfo> = (route) => {
  return inject(CoreApiDataService).getObject<HierarchyInfo>(String(route.params['name']));
};
