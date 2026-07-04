import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule  }
				from '@angular/router';

import { DataRangeService }	from '../../../../shared/services/data-range-service';
import { DataRangeMonth }	from '../../../../shared/utils/data-range-month';
import { FormatDataMonthPipe }  from '../../../../shared/pipes/format-data-month-pipe';

import { RankingList }          from '../../components/ranking-list/ranking-list';
import { RankingSelect }        from '../../components/ranking-select/ranking-select';
import { RankingItemInfo }      from '../../models/ranking-item-info';

@Component({
  selector: 'app-ranking',
  imports: [ RouterModule, RankingList, RankingSelect, FormatDataMonthPipe ],
  templateUrl: './ranking.html',
  styleUrl: './ranking.scss'
})

export class Ranking implements OnInit {
  #route = inject(ActivatedRoute);
  #range = inject(DataRangeService);

  top10   : RankingItemInfo[] = [];
  latest! : DataRangeMonth;

  ngOnInit():void {
    this.top10  = this.#route.snapshot.data['top10'];
    this.latest = this.#range.latest;
  }
}
