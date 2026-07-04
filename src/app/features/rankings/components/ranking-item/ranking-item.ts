import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RankingItemInfo } from '../../models/ranking-item-info';

@Component({
  selector: 'app-ranking-item',
  imports: [ RouterModule ],
  templateUrl: './ranking-item.html',
  styleUrl: './ranking-item.scss'
})

export class RankingItem {
  readonly rankingItem = input.required<RankingItemInfo>();
}
