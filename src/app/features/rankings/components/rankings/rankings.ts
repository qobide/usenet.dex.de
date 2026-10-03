import { Component, input, booleanAttribute } from '@angular/core';

import { RouterModule } from '@angular/router';

import { FormatDataMonthPipe } from '../../../../shared/pipes/format-data-month-pipe';

import { RankingList }         from '../../../../features/rankings/components/ranking-list/ranking-list';
import { RankingsInfo } from '../../models/rankings-info';

@Component({
  selector: 'app-rankings',
  imports: [ RouterModule, FormatDataMonthPipe, RankingList ],
  templateUrl: './rankings.html',
  styleUrl: './rankings.scss',
})

export class Rankings {
  readonly rankings = input.required<RankingsInfo>();
  readonly showGains = input(false, { transform: booleanAttribute });
}
