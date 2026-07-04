import { Injectable, inject } from '@angular/core';

import { ChartMonthEnum } from '../constants/chart-month-enum';
import { ChartYearEnum  } from '../constants/chart-year-enum';

import { ChartOptionsType } from '../types/chart-options-type';
import { ChartMonthType   } from '../types/chart-month-type';
import { ChartYearType    } from '../types/chart-year-type';

import { DataMonthsFull, DataMonthsShort } from '../../../shared/constants/data-months';
import { DataRangeService } from '../../../shared/services/data-range-service';

type ChartSeriesData      = ChartOptionsType;
type ChartSeriesDataArray = (ChartSeriesData|null)[];


@Injectable({
  providedIn: 'root'
})

export class ChartService {
  #range = inject(DataRangeService);


  /* ------------------------------------------------------------------ */
  /* ------------------------------------------------------------------ */

  withMissingMonths(list: ChartMonthType[]):ChartMonthType[]{
    const filled:ChartMonthType[] = [];

    const mlen = list.length;
    if (mlen < 1) { return filled; }

    const first = list[0];

    let year  = first[ChartMonthEnum.Year];
    let month = first[ChartMonthEnum.Month];

    for (let i = 0; i < mlen; i++) {
      const item = list[i];

      while (!(item[ChartMonthEnum.Year] == year && item[ChartMonthEnum.Month] == month)) {
        filled.push([ year, month, null ]);

        month++;
        if (month > 12) { year++; month = 1; }
      }

      filled.push(item);

      month++;
      if (month > 12) { year++; month = 1; }
    }

    return filled;
  }

  withMissingYears(list: ChartYearType[]):ChartYearType[]{
    const filled:ChartYearType[] = [];

    const mlen = list.length;
    if (mlen < 1) { return filled; }

    const first = list[0];

    let year = first[ChartMonthEnum.Year];

    for (let i = 0; i < mlen; i++) {
      const item = list[i];

      while (!(item[ChartMonthEnum.Year] == year)) {
        filled.push([ year, null ]);

        year++;
      }

      filled.push(item);

      year++;
    }

    return filled;
  }


  /* ------------------------------------------------------------------ */
  /* ------------------------------------------------------------------ */

  monthsLabels(months : ChartMonthType[], format='yyyy-mm'):string[] {
    const labels: string[] = [];

    const len = months.length;
    if (len < 1) { return labels; }

    let year  = months[0][0];
    let month = months[0][1];

    for (let i = 0; i < len; i++) {
      let ly = String(year);
      let lm = String(month);

      if (format == 'M yyyy') {
        lm = DataMonthsShort[month];
        labels.push(lm+' '+ly);

      } else if (format == 'MM yyyy') {
        lm = DataMonthsFull[month];
        labels.push(lm+' '+ly);

      } else if (format == 'mm/yy') {
        if (lm.length < 2) { lm = '0'+lm; }
        ly = ly.substring(2);

        labels.push(lm+'/'+ly);

      } else if (format == 'mm/yyyy') {
        if (lm.length < 2) { lm = '0'+lm; }

        labels.push(lm+'/'+ly);

      } else {
        if (lm.length < 2) { lm = '0'+lm; }

        labels.push(ly+'-'+lm);
      }

      month++;

      if (month > 12) {
        year++;
        month = 1;
      }
    }

    return labels;
  }

  yearsLabels(months : ChartMonthType[] | ChartYearType[]):string[] {
    const labels: string[] = [];

    const len = months.length;
    if (len < 1) { return labels; }

    for (let i = months[0][0]; i <= months[len-1][0]; i++) {
      labels.push(String(i));
    }

    return labels;
  }


  /* ------------------------------------------------------------------ */
  /* ------------------------------------------------------------------ */

  #resolveSeries(source:string, color:string, list: ChartOptionsType[], look: Record<string,number>): ChartOptionsType {
    if (source in look) { return list[look[source]]; }

    const data   : ChartSeriesDataArray = [];
    const series : ChartOptionsType = { data, source, color };

    look[source]       = list.length;
    list[look[source]] = series;

    return series;
  }

  #expandMonthsIntoSeries(list:ChartMonthType[], valueIndex:number=ChartMonthEnum.Postings):ChartOptionsType[] {
    const mlen = list.length;
    if (mlen < 1) { return []; }

    const range = this.#range;

    const colors  = range.monthColor;
    const sources = range.monthSource;

    const slist : ChartOptionsType[] = [];
    const slook : Record<string,number> = {};

    const first  = list[0];

    let index  = 0;
    let offset = range.monthOffset({ year: first[ChartMonthEnum.Year], month: first[ChartMonthEnum.Month]});

    for (let i = 0; i < mlen; i++) {
      if (!range.missing[offset]) {
        const item = list[i];

        const year  = item[ChartMonthEnum.Year];
        const month = item[ChartMonthEnum.Month];
        const value = item[valueIndex];

        const source = sources[offset];
        const color  = colors[offset];

        const series = this.#resolveSeries(source, color, slist, slook);

        series['data'][index] = { value, month, year };
      }

      index++;
      offset++;
    }

    return slist;
  }

  calcPostingsMonthsSeries(months:ChartMonthType[], soptions:ChartOptionsType): ChartOptionsType[] {
    if (!months.length) { return []; }

    const labels = this.monthsLabels(months, 'MM yyyy');
    const series = this.#expandMonthsIntoSeries(months);

    return series.map(({ data, source, color }) => {
      const sdata = data.map((v:ChartSeriesData, i:number) => {
        return { name: labels[i], value: v['value'] };
      });

      return { ...soptions, data : sdata, name : source, color };
    });
  }

  calcPostingsYearsSeries(months:ChartMonthType[], soptions:ChartOptionsType): ChartOptionsType[] {
    if (!months.length) { return []; }

    const labels = this.yearsLabels(months);
    const slist  = this.#expandMonthsIntoSeries(months);

    const yindex : Record<string,number> = {};

    labels.map((year:string, index:number) => { yindex[year] = index; });

    const series = slist.map(({ data, source, color }) => {
      const sdata: (number|undefined)[] = [];

      data.map((v:ChartSeriesData) => {
        const { year, value } = v;
        const index = yindex[year];

        sdata[index] = value + (sdata[index] || 0);
      });

      return { ...soptions, data : sdata, name : source, color };
    });

    return series;
  }


  /* ------------------------------------------------------------------ */
  /* ------------------------------------------------------------------ */

  calcGainLossMonthsSeries(months:ChartMonthType[], soptions:ChartOptionsType, waterfall=false): ChartOptionsType[] {
    if (!months.length) { return []; }

    const lm = waterfall ? -1 : 1; // loss multiplicator

    const labels = this.monthsLabels(months, 'MM yyyy');

    const pdata: ChartSeriesDataArray = [];
    const gdata: ChartSeriesDataArray = [];
    const ldata: ChartSeriesDataArray = [];

    months.map((m:ChartMonthType, i:number) => {
      if (m[ChartMonthEnum.Gain] == undefined) {
        pdata.push(null);
        gdata.push(null);
        ldata.push(null);

      } else {
        const value = m[ChartMonthEnum.Postings] || 0;
        const gain  = m[ChartMonthEnum.Gain    ] || 0;

        if (gain >= 0) {
          pdata.push({ value : value - gain });
          gdata.push({ name: labels[i], value: gain });
          ldata.push(null);

        } else {
          pdata.push({ value : value });
          gdata.push(null);
          ldata.push({ name: labels[i], value: gain * lm });
        }
      }

    });

    if (waterfall) {
      return [
        { ...soptions, data : pdata, color : 'transparent' },
        { ...soptions, data : gdata, color : 'green' },
        { ...soptions, data : ldata, color : 'red' },
      ];
    }

    return [
      { ...soptions, data : gdata, color : 'green' },
      { ...soptions, data : ldata, color : 'red' },
    ];
  }

  calcGainLossYearsSeries(years:ChartYearType[], soptions:ChartOptionsType, waterfall=false): ChartOptionsType[] {
    if (!years.length) { return []; }

    const lm = waterfall ? -1 : 1; // loss multiplicator

    const labels = this.yearsLabels(years);

    const pdata: ChartSeriesDataArray = [];
    const gdata: ChartSeriesDataArray = [];
    const ldata: ChartSeriesDataArray = [];

    years.map((y:ChartYearType, i:number) => {
      if (y[ChartYearEnum.Gain] == undefined) {
        pdata.push(null);
        gdata.push(null);
        ldata.push(null);

      } else {
        const value = y[ChartYearEnum.Postings] || 0;
        const gain  = y[ChartYearEnum.Gain]     || 0;

        if (gain >= 0) {
          pdata.push({ value : value - gain });
          gdata.push({ name: labels[i], value: gain });
          ldata.push(null);

        } else {
          pdata.push({ value : value });
          gdata.push(null);
          ldata.push({ name: labels[i], value: gain * lm });
        }
      }
    });

    if (waterfall) {
      return [
        { ...soptions, data : pdata, color : 'transparent' },
        { ...soptions, data : gdata, color : 'green', label : { show : true, position : 'top' } },
        { ...soptions, data : ldata, color : 'red',   label : { show : true, position : 'bottom' } },
      ];
    }

    return [
      { ...soptions, data : gdata, color : 'green', label : { show : true, position : 'top' } },
      { ...soptions, data : ldata, color : 'red',   label : { show : true, position : 'bottom' } },
    ];
  }


  /* ------------------------------------------------------------------ */
  /* ------------------------------------------------------------------ */

  #resolveSeasonData(year:number, list: ChartOptionsType[], look: Record<string,ChartOptionsType>, soptions:ChartOptionsType): ChartSeriesDataArray {
    if (year in look) { return look[year]['data']; }

    const data : ChartSeriesDataArray = [];
    const series : ChartOptionsType = { ...soptions, data, name : year };

    list.push(series);
    look[String(year)] = series;

    return data;
  }

  calcSeasonsSeries(months:ChartMonthType[], soptions:ChartOptionsType): ChartOptionsType[] {
    if (!months.length) { return []; }

    const labels = this.monthsLabels(months, 'MM yyyy');

    const series : ChartOptionsType[] = [];
    const look   : Record<string,ChartOptionsType> = {};

    months.forEach((item:ChartMonthType, index) => {
      const year  = item[0];
      const month = item[1];
      const value = item[2];

      const name = labels[index];
      const data = this.#resolveSeasonData(year, series, look, soptions);

      data[month] = { name, value };

      if (month == 1) {
        const prev = look[year-1]?.['data'];

        if (prev) {
          prev[13] = { name, value };
          data[ 0] = prev[12];
        }
      }

    });

    return series;
  }


  /* ------------------------------------------------------------------ */
  /* ------------------------------------------------------------------ */

  calcRankingMonthsSeries(months:ChartMonthType[], soptions:ChartOptionsType): ChartOptionsType[] {
    if (!months.length) { return []; }

    const labels = this.monthsLabels(months, 'MM yyyy');

    const sdata = months.map((m:ChartMonthType, i:number) => {
      return { name: labels[i], value: m[ChartMonthEnum.Rank] };
    });

    return [{ ...soptions, data : sdata }];
  }

  calcRankingYearsSeries(years:ChartYearType[], soptions:ChartOptionsType): ChartOptionsType[] {
    if (!years.length) { return []; }

    const labels = this.yearsLabels(years);

    const sdata = years.map((y:ChartYearType, i:number) => {
      return { name: labels[i], value: y[ChartYearEnum.Rank] };
    });

    return [{ ...soptions, data : sdata, label : { show : true, position : 'top' } }];
  }


  /* ------------------------------------------------------------------ */
  /* ------------------------------------------------------------------ */

  calcGroupsMonthsSeries(months:ChartMonthType[], soptions:ChartOptionsType): ChartOptionsType[] {
    if (!months.length) { return []; }

    const labels = this.monthsLabels(months, 'MM yyyy');

    const sdata = months.map((m:ChartMonthType, i:number) => {
      return { name: labels[i], value: m[ChartMonthEnum.Rank] };
    });

    return [{ ...soptions, data : sdata }];
  }

  calcGroupsYearsSeries(years:ChartYearType[], soptions:ChartOptionsType): ChartOptionsType[] {
    if (!years.length) { return []; }

    const labels = this.yearsLabels(years);

    const sdata = years.map((y:ChartYearType, i:number) => {
      return { name: labels[i], value: y[ChartYearEnum.Rank] };
    });

    return [{ ...soptions, data : sdata, label : { show : true, position : 'top' } }];
  }



  /* ------------------------------------------------------------------ */
  /* ------------------------------------------------------------------ */

  calcMonthsDefaultZoom(months : ChartMonthType[]): [number, number] {
    const zoomEnd = months.length - 1;

    let zoomStart = zoomEnd - 120;
    if (zoomStart < 0) { zoomStart = 0; }

    return [ zoomStart, zoomEnd ];
  }

  calcMonthsYearZoom(months : ChartMonthType[], year : number): [number,number] {
    let startValue = -1;
    let endValue   = -1;

    const mlen = months.length;
    if (mlen < 1) { return [ startValue, endValue ]; }

    const first = months[0];
    const last  = months[mlen-1];

    const fr = this.#range.dataRangeMonth({ year : first[ChartMonthEnum.Year], month : first[ChartMonthEnum.Month] });
    const to = this.#range.dataRangeMonth({ year :  last[ChartMonthEnum.Year], month :  last[ChartMonthEnum.Month] });

    const off = fr.offset;

    startValue = fr.offset;
    startValue = startValue - fr.month + 1;

    startValue += ((year - fr.year) * 12);

    endValue = startValue + 11;

    if (startValue < fr.offset) { startValue = fr.offset; }
    if (endValue   > to.offset) { endValue   = to.offset; }

    startValue -= off;
    endValue   -= off;

    return [ startValue, endValue ];
  }
}
