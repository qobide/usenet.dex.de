import { InjectionToken, inject } from '@angular/core';

import { DataConfigLoader } from '../services/data-config-loader';

import { DataConfigInfo } from '../models/data-config-info';

export const DATA_CONFIG = new InjectionToken<DataConfigInfo>('data.config', {
  providedIn: 'root',
  factory: () => {
    return inject(DataConfigLoader).config;
  }
});
