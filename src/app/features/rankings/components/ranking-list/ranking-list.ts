import { Component, input } from '@angular/core';

import { RankingItem } from '../ranking-item/ranking-item';
import { RankingItemInfo } from '../../models/ranking-item-info';

@Component({
  selector: 'app-ranking-list',
  imports: [ RankingItem ],
  templateUrl: './ranking-list.html',
  styleUrl: './ranking-list.scss'
})

export class RankingList {
  readonly rankingList = input.required<RankingItemInfo[]>();
}
