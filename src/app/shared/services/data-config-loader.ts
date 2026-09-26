import { Injectable, inject } from '@angular/core';

import { CoreApiDataService} from '../../core/apis/data-service';

import { DataConfigInfo } from '../models/data-config-info';
import { DataVersionInfo } from '../models/data-version-info';

@Injectable({
  providedIn: 'root'
})

export class DataConfigLoader {
  #data : CoreApiDataService = inject(CoreApiDataService);

  config : DataConfigInfo = {
    version : 0,
    compiledAt : '',
    range : { oldest : { year : 0, month : 0 }, latest : { year : 0, month : 0 } },
    valid : []
  };

  version : number = 0;

  async load(): Promise<DataConfigInfo> {
    const that = this;

    const ds = this.#data;

    const config  = await ds.getObject<DataConfigInfo>('config', Date.now());
    const version = config.version;

    this.config  = config;
    this.version = version;

    ds.setCacheVersion(config.version);

    document.addEventListener("visibilitychange", async () => {
      if (document.visibilityState === "visible") {
        const version = await ds.getObject<DataVersionInfo>('version', Date.now());

        if (version.version != that.version) {
          location.reload();
        }
      }
    });

    return config;
  }
}
