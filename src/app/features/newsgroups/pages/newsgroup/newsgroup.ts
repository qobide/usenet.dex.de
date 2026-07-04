import { Component, inject, OnInit } 	from '@angular/core';
import { Router, ActivatedRoute, ParamMap } 	from '@angular/router';
import { Title } 			from '@angular/platform-browser';

import { ChartGranularityEnum }	from '../../constants/chart-granularity-enum';

import { ChartMonthType }       from '../../types/chart-month-type'
import { ChartYearType }        from '../../types/chart-year-type'

import { NewsgroupInfo }	from '../../models/newsgroup-info';
import { AtoZRangeInfo }	from '../../models/atoz-range-info';

import { CoreApiDataService }	from '../../../../core/apis/data-service';
import { ChartService }		from '../../services/chart-service';

import { HierarchyTitle }	from '../../components/hierarchy-title/hierarchy-title';

import { ChartPostings }	from '../../components/chart-postings/chart-postings';
import { ChartGainLoss }	from '../../components/chart-gain-loss/chart-gain-loss';
import { ChartSeasons }		from '../../components/chart-seasons/chart-seasons';
import { ChartRanking }		from '../../components/chart-ranking/chart-ranking';

@Component({
  selector: 'app-newsgroup',
  imports: [ HierarchyTitle, ChartPostings, ChartGainLoss, ChartSeasons, ChartRanking ],
  templateUrl: './newsgroup.html',
  styleUrl: './newsgroup.scss'
})

export class Newsgroup implements OnInit {
  #router = inject(Router);
  #route  = inject(ActivatedRoute);
  #data   = inject(CoreApiDataService);
  #chart  = inject(ChartService);
  #title  = inject(Title);

  name!   : string;
  range!  : AtoZRangeInfo;
  active! : boolean;

  granularity : typeof ChartGranularityEnum = ChartGranularityEnum;

  months! : ChartMonthType[];
  years!  : ChartYearType[];

  postGranularity : ChartGranularityEnum = ChartGranularityEnum.Years;
  postZoom        : number|undefined;

  gainGranularity : ChartGranularityEnum = ChartGranularityEnum.Years;
  gainZoom        : number|undefined;
  gainWaterfall   = false;

  rankGranularity : ChartGranularityEnum = ChartGranularityEnum.Years;
  rankZoom        : number|undefined;

  ngOnInit(): void {
    const snapshot = this.#route.snapshot;
    const detail   = snapshot.data['detail'];

    this.setup(detail, Number(snapshot.queryParams['year']));

    this.#route.paramMap.subscribe((params: ParamMap) => {
      const name = params.get('name');
      if (!name || (name === this.name)) { return; }

      const year = Number(this.#route.snapshot.queryParams['year']);

      this.#data.getObject<NewsgroupInfo>(name).then((detail) => {
        this.setup(detail, year);
        this.gainWaterfall = false;
      });
    });

    this.#route.queryParamMap.subscribe((params: ParamMap) => {
      const year = Number(params.get('year'));
      if (!year === !this.postZoom) { return; }

      this.setZoom(year);
    });
  }

  setup(detail:NewsgroupInfo, year?:number): void {
    if (detail.name == this.name) { return; }

    this.name   = detail.name;
    this.range  = detail.range;
    this.active = detail.active;

    this.months = this.#chart.withMissingMonths(detail.months || []);
    this.years  = this.#chart.withMissingYears( detail.years  || []);

    const defGranularity = this.years.length > 10 ? ChartGranularityEnum.Years : ChartGranularityEnum.Months;

    this.postGranularity = defGranularity;
    this.gainGranularity = defGranularity;
    this.rankGranularity = defGranularity;

    this.#title.setTitle(this.name);

    this.setZoom(year);
  }

  setZoom(year?:number): void {
    if (!year === !this.postZoom) { return; }

    this.postZoom = year;
    this.gainZoom = year;
    this.rankZoom = year;

    if (year) {
      const defGranularity = ChartGranularityEnum.Months;

      this.postGranularity = defGranularity;
      this.gainGranularity = defGranularity;
      this.rankGranularity = defGranularity;
    }
  }

  togglePostGranularity(granularity:ChartGranularityEnum, year?:number): void {
    if (granularity == this.postGranularity) { return; }

    this.postGranularity = granularity;
    this.postZoom = year;
  }

  toggleGainGranularity(granularity:ChartGranularityEnum, year?:number): void {
    if (granularity == this.gainGranularity) { return; }

    this.gainGranularity = granularity;
    this.gainZoom = year;
  }

  toggleRankGranularity(granularity:ChartGranularityEnum, year?:number): void {
    if (granularity == this.rankGranularity) { return; }

    this.rankGranularity = granularity;
    this.rankZoom = year;
  }

  redirectToRanking(index:number): void {
    if (this.rankGranularity == ChartGranularityEnum.Months) {
      const month = this.months[index];
      this.#router.navigate([ '/ranking', month[0], month[1],{ fragment : this.name } ]);

    } else if (this.rankGranularity == ChartGranularityEnum.Years) {
      const year = this.years[index];
      this.#router.navigate([ '/ranking', year[0], { fragment : this.name } ]);
    }
  }

}
