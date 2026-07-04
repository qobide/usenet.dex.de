import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormatDataMonthPipe } from '../../../../shared/pipes/format-data-month-pipe';

import { AtoZItemInfo } from '../../models/atoz-item-info';

@Component({
  selector: 'app-atoz-item',
  imports: [ RouterModule, FormatDataMonthPipe ],
  templateUrl: './atoz-item.html',
  styleUrl: './atoz-item.scss'
})

export class AtoZItem {
  readonly atozItem = input.required<AtoZItemInfo>();
}
