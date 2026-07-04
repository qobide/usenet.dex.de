import { Component, inject, OnInit } 	from '@angular/core';
import { ActivatedRoute, RouterModule, ParamMap }
				from '@angular/router';
import { Title } 		from '@angular/platform-browser';

import { RankingApiDataService }from '../../apis/data-service';

import { DataRangeService }	from '../../../../shared/services/data-range-service';
import { DataRangeMonth }	from '../../../../shared/utils/data-range-month';
import { DataRangeMonthInfo }	from '../../../../shared/models/data-range-month-info';

import { RankingList }     	from '../../components/ranking-list/ranking-list';
import { RankingItemInfo } 	from '../../models/ranking-item-info';

@Component({
  selector: 'app-ranking-year',
  imports: [ RankingList, RouterModule ],
  templateUrl: './ranking-year.html',
  styleUrl: './ranking-year.scss'
})

export class RankingYear implements OnInit {
  #route = inject(ActivatedRoute);
  #title = inject(Title);
  #data  = inject(RankingApiDataService);
  #range = inject(DataRangeService);

  year!  : number;

  ranking : RankingItemInfo[] = [];

  first! : DataRangeMonthInfo;
  prev   : number | undefined;
  next   : number | undefined;
  last!  : DataRangeMonthInfo;

  months : DataRangeMonth[] = [];

  ngOnInit(): void {
    this.first = this.#range.oldest;
    this.last  = this.#range.latest;

    const snapshot = this.#route.snapshot;

    const year    = Number(snapshot.paramMap.get('year'));
    const ranking = snapshot.data['ranking' ];

    this.setup(year, ranking);

    this.#route.paramMap.subscribe((params: ParamMap) => {
      const year = Number(params.get('year'));

      if (year == this.year) { return; }

      if (this.#range.validYear(year)) {
        this.#data.getRanking(year).then((ranking) => {
          this.setup(year, ranking);
        });
      }
    });
  }

  setup(year:number, ranking:RankingItemInfo[]) {
    this.year    = year;
    this.ranking = ranking;

    this.prev = this.#range.prevYear(year);
    this.next = this.#range.nextYear(year);

    this.#title.setTitle('Ranking ' + year);
  }
}
