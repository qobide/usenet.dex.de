import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RankingItemInfo } from '../../models/ranking-item-info';

@Component({
  selector: 'app-ranking-item-gain',
  imports: [ RouterModule ],
  templateUrl: './ranking-item-gain.html',
  styleUrl: './ranking-item-gain.scss'
})

export class RankingItemGain {
  readonly rankingItem = input.required<RankingItemInfo>();
}
