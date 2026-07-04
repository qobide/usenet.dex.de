import { Component, inject, OnInit } 	from '@angular/core';
import { ActivatedRoute, ParamMap } 	from '@angular/router';

import { Title } 		from '@angular/platform-browser';

import { ChartGranularityEnum }	from '../../constants/chart-granularity-enum';

import { ChartMonthType }       from '../../types/chart-month-type'
import { ChartYearType }        from '../../types/chart-year-type'

import { HierarchyInfo }	from '../../models/hierarchy-info';
import { AtoZItemInfo }		from '../../models/atoz-item-info';
import { AtoZRangeInfo }	from '../../models/atoz-range-info';

import { CoreApiDataService }	from '../../../../core/apis/data-service';
import { ChartService }		from '../../services/chart-service';

import { HierarchyTitle }	from '../../components/hierarchy-title/hierarchy-title';

import { ChartPostings }	from '../../components/chart-postings/chart-postings';
import { ChartGainLoss }	from '../../components/chart-gain-loss/chart-gain-loss';
import { ChartSeasons }		from '../../components/chart-seasons/chart-seasons';
import { ChartGroups }		from '../../components/chart-groups/chart-groups';
import { AtoZList }		from '../../components//atoz-list/atoz-list';


@Component({
  selector: 'app-hierarchy',
  imports: [ HierarchyTitle, ChartPostings, ChartGainLoss, ChartSeasons, ChartGroups, AtoZList ],
  templateUrl: './hierarchy.html',
  styleUrl: './hierarchy.scss'
})

export class Hierarchy implements OnInit {
  #route = inject(ActivatedRoute);
  #data  = inject(CoreApiDataService);
  #chart = inject(ChartService);
  #title = inject(Title);

  name!   : string;
  range!  : AtoZRangeInfo;
  active! : boolean;

  granularity : typeof ChartGranularityEnum = ChartGranularityEnum;

  months! : ChartMonthType[];
  years!  : ChartYearType[];

  postGranularity : ChartGranularityEnum = ChartGranularityEnum.Years;
  postMonthsZoom  : number|undefined;

  gainGranularity : ChartGranularityEnum = ChartGranularityEnum.Years;
  gainMonthsZoom  : number|undefined;
  gainWaterfall = false;

  groupGranularity : ChartGranularityEnum = ChartGranularityEnum.Years;
  groupMonthsZoom  : number|undefined;

  atoz! : AtoZItemInfo[];

  ngOnInit(): void {
    const snapshot = this.#route.snapshot;

    const year = snapshot.queryParams['year'];

    this.postMonthsZoom  = year;
    this.gainMonthsZoom  = year;
    this.groupMonthsZoom = year;

    const detail = this.#route.snapshot.data['detail'];
    this.setup(detail);

    this.#route.paramMap.subscribe((params: ParamMap) => {
      const name = params.get('name');
      if (!name || (name === this.name)) { return; }

      this.#data.getObject<HierarchyInfo>(name).then((detail) => {
        this.postMonthsZoom = undefined;
        this.gainMonthsZoom = undefined;

        this.gainWaterfall  = false;
        this.setup(detail);
      });
    });

    this.#route.queryParamMap.subscribe((params: ParamMap) => {
      const year = Number(params.get('year'));

      if (year) {
        this.postMonthsZoom  = year;
        this.postMonthsZoom  = year;
        this.groupMonthsZoom = year;
      }
    });
  }

  setup(detail:HierarchyInfo): void {
    if (detail.name == this.name) { return; }

    this.name   = detail.name;
    this.range  = detail.range;
    this.active = detail.active;

    this.months = this.#chart.withMissingMonths(detail.months || []);
    this.years  = this.#chart.withMissingYears( detail.years  || []);

    const defGranularity = this.years.length > 10 ? ChartGranularityEnum.Years : ChartGranularityEnum.Months;

    this.postGranularity  = defGranularity;
    this.gainGranularity  = defGranularity;
    this.groupGranularity = defGranularity;

    this.atoz = detail.atoz || [];

    this.#title.setTitle(this.name);
  }

  togglePostGranularity(granularity:ChartGranularityEnum, year?:number): void {
    if (granularity == this.postGranularity) { return; }

    this.postGranularity = granularity;
    this.postMonthsZoom  = year;
  }

  toggleGainGranularity(granularity:ChartGranularityEnum, year?:number): void {
    if (granularity == this.gainGranularity) { return; }

    this.gainGranularity = granularity;
    this.gainMonthsZoom  = year;
  }

   toggleGroupGranularity(granularity:ChartGranularityEnum, year?:number): void {
    if (granularity == this.groupGranularity) { return; }

    this.groupGranularity = granularity;
    this.groupMonthsZoom  = year;
  }

}
