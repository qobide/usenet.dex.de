import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { CoreApiDataService } from '../../../core/apis/data-service';

import { AtoZItemInfo } from '../models/atoz-item-info';

export const atozResolver: ResolveFn<AtoZItemInfo[]> = () => {
  return inject(CoreApiDataService).getArray<AtoZItemInfo>('atoz');
};
