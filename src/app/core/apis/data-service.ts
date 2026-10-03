import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CoreApiDataService {
  readonly baseURL = environment.dataURL;

  cacheVersion = 0;

  setCacheVersion(version:number) {
    this.cacheVersion = version;
  }

  getCacheBuster(version?:number):string {
    version = version ?? this.cacheVersion;

    if (version == 0) { return ''; }

    return '?'+String(version);
  }

  getFullUrl(path:string, version?:number):string {
    return this.baseURL+'/'+path+'.json'+this.getCacheBuster(version);
  }

  csvURL(name:string, version?:number):string {
    return this.baseURL+'/'+name+'.csv'+this.getCacheBuster(version);
  }

  async getObject<Type>(path:string, version?:number): Promise<Type> {
    const url = this.getFullUrl(path, version);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json() ?? {};

    return json as Type;
  }

  async getArray<Type>(path:string, version?:number): Promise<Type[]> {
    const url = this.getFullUrl(path, version);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json() ?? [];

    return json as Type[];
  }
}
