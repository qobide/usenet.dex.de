import { Injectable } from '@angular/core';

import { CoreApiDataService } from '../../../core/apis/data-service';

import { RankingItemInfo } from '../models/ranking-item-info';

@Injectable({
  providedIn: 'root'
})

export class RankingApiDataService extends CoreApiDataService {

  async getRanking(year:number, month?:number):Promise<RankingItemInfo[]> {
    let path = String(year);

    if (typeof month != 'undefined') {
      path += '/'+String(month);
    }

    path += '/ranking';

    return super.getArray<RankingItemInfo>(path);
  }
}
