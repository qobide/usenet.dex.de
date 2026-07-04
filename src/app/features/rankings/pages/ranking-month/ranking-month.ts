import { Component, inject, OnInit }   	from '@angular/core';
import { ActivatedRoute, RouterModule, ParamMap }
				from '@angular/router';
import { Title } 		from '@angular/platform-browser';

import { RankingApiDataService }from '../../apis/data-service';

import { DataRangeService }	from '../../../../shared/services/data-range-service';
import { DataRangeMonthInfo }	from '../../../../shared/models/data-range-month-info';
import { FormatDataMonthPipe }	from '../../../../shared/pipes/format-data-month-pipe';

import { RankingList }     	from '../../components/ranking-list/ranking-list';
import { RankingItemInfo } 	from '../../models/ranking-item-info';

@Component({
  selector: 'app-ranking-month',
  imports: [ RankingList, RouterModule, FormatDataMonthPipe ],
  templateUrl: './ranking-month.html',
  styleUrl: './ranking-month.scss'
})

export class RankingMonth implements OnInit {
  #route = inject(ActivatedRoute);
  #data  = inject(RankingApiDataService);
  #range = inject(DataRangeService);
  #title = inject(Title);

  year!  : number;
  month! : number;

  ranking : RankingItemInfo[] = [];

  first! : DataRangeMonthInfo;
  next   : DataRangeMonthInfo | undefined;
  prev   : DataRangeMonthInfo | undefined;
  last!  : DataRangeMonthInfo;

  ngOnInit(): void {
    this.first = this.#range.oldest;
    this.last  = this.#range.latest;

    const snapshot = this.#route.snapshot;

    const year    = Number(snapshot.paramMap.get('year'));
    const month   = Number(snapshot.paramMap.get('month'));
    const ranking = snapshot.data['ranking'];

    this.setup(year, month, ranking);

    this.#route.paramMap.subscribe((params: ParamMap) => {
      const year  = Number(params.get('year'));
      const month = Number(params.get('month'));

      if (year == this.year && month == this.month) { return; }

      if (this.#range.validMonth(year, month)) {
        this.#data.getRanking(year, month).then((ranking) => {
          this.setup(year, month, ranking);
        });
      }
    });
  }

  setup(year:number, month:number, ranking:RankingItemInfo[]): void {
    this.year  = year;
    this.month = month;

    this.ranking = ranking;

    const drm = this.#range.dataRangeMonth({ year, month });

    this.prev = drm.prev(true);
    this.next = drm.next(true);

    this.#title.setTitle('Ranking '+year+'-'+month);
  }
}
