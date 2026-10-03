import { Component, inject, OnInit, OnDestroy, Renderer2 } 	from '@angular/core';
import { ActivatedRoute, RouterModule }	from '@angular/router';

import { DataRangeService }	from '../../../../shared/services/data-range-service';
import { DataRangeMonth }	from '../../../../shared/utils/data-range-month';

import { DataRangeSourceType }  from '../../../../shared/types/data-range-source-type';
import { DataRangeMissingType } from '../../../../shared/types/data-range-missing-type';

import { DataRangeMissingLabelPipe } from '../../../../shared/pipes/data-range-missing-label-pipe';
import { FormatDataMonthPipe }	     from '../../../../shared/pipes/format-data-month-pipe';

import { Rankings } 	from '../../../../features/rankings/components/rankings/rankings';
import { RankingsInfo } from '../../../../features/rankings/models/rankings-info';

@Component({
  selector: 'app-home',
  imports: [ Rankings, RouterModule, FormatDataMonthPipe, DataRangeMissingLabelPipe ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})

export class Home implements OnInit, OnDestroy {
  #route    = inject(ActivatedRoute);
  #range    = inject(DataRangeService);
  #renderer = inject(Renderer2);

  rankings! : RankingsInfo;

  sources! : DataRangeSourceType[];
  missing! : DataRangeMissingType[];

  ngOnInit():void {
    this.rankings = this.#route.snapshot.data['home'].rankings;

    this.sources = this.#range.range.source  || [];
    this.missing = this.#range.range.missing || [];

    this.#renderer.addClass(document.body, 'usenet-dex-de-home');
  }

  ngOnDestroy():void {
    this.#renderer.removeClass(document.body, 'usenet-dex-de-home');
  }
}
