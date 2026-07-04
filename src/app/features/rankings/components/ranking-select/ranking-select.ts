import { Component, inject, OnInit } from '@angular/core';
import { RouterModule }              from '@angular/router';

import { DataRangeService } 	from '../../../../shared/services/data-range-service';
import { DataRangeMonth } 	from '../../../../shared/utils/data-range-month';

@Component({
  selector: 'app-ranking-select',
  imports: [ RouterModule ],
  templateUrl: './ranking-select.html',
  styleUrl: './ranking-select.scss'
})

export class RankingSelect implements OnInit {
  #range = inject(DataRangeService);

  years : { year : number, months : DataRangeMonth[] }[] = [];

  ngOnInit():void {
    const yo = this.#range.oldest.year;
    const yl = this.#range.latest.year;

    for (let y = yo; y <= yl; y++) {
      const months = this.#range.availableMonths(y, true);

      this.years.unshift({ year : y, months });
    }
  }
}
