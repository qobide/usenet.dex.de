import { Component, inject, OnInit, OnDestroy, Renderer2 } 	from '@angular/core';
import { ActivatedRoute, RouterModule }	from '@angular/router';

import { DataRangeService }	from '../../../../shared/services/data-range-service';
import { DataRangeMonth }	from '../../../../shared/utils/data-range-month';

import { DataRangeSourceType }  from '../../../../shared/types/data-range-source-type';
import { DataRangeMissingType } from '../../../../shared/types/data-range-missing-type';

import { DataRangeMissingLabelPipe } from '../../../../shared/pipes/data-range-missing-label-pipe';
import { FormatDataMonthPipe }	     from '../../../../shared/pipes/format-data-month-pipe';

import { RankingList } 		from '../../../../features/rankings/components/ranking-list/ranking-list';
import { RankingItemInfo } 	from '../../../../features/rankings/models/ranking-item-info';

@Component({
  selector: 'app-home',
  imports: [ RankingList, RouterModule, FormatDataMonthPipe, DataRangeMissingLabelPipe ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home implements OnInit, OnDestroy {
  #route    = inject(ActivatedRoute);
  #range    = inject(DataRangeService);
  #renderer = inject(Renderer2);

  latest!  : DataRangeMonth;
  top10!   : RankingItemInfo[];

  sources! : DataRangeSourceType[];
  missing! : DataRangeMissingType[];

  ngOnInit():void {
    this.latest  = this.#range.latest;
    this.top10   = this.#route.snapshot.data['home'].top10 || [];

    this.sources = this.#range.range.source  || [];
    this.missing = this.#range.range.missing || [];

    this.#renderer.addClass(document.body, 'usenet-dex-de-home');
  }

  ngOnDestroy():void {
    this.#renderer.removeClass(document.body, 'usenet-dex-de-home');
  }
}
