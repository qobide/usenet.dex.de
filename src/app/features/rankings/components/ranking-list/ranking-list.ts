import { Component, input } from '@angular/core';

import { RankingItem }     from '../ranking-item/ranking-item';
import { RankingItemGain } from '../ranking-item-gain/ranking-item-gain';

import { RankingItemInfo } from '../../models/ranking-item-info';

@Component({
  selector: 'app-ranking-list',
  imports: [ RankingItem, RankingItemGain ],
  templateUrl: './ranking-list.html',
  styleUrl: './ranking-list.scss'
})

export class RankingList {
  readonly rankingList = input.required<RankingItemInfo[]>();
  readonly style       = input('ranking');
}
