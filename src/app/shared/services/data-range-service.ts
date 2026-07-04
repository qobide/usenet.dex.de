import { Injectable, inject }	from '@angular/core';

import { DATA_CONFIG } 		from '../constants/data-config';

import { DataRangeInfo }	from '../models/data-range-info';

import { DataRangeMissingEnum }	from '../constants/data-range-missing-enum';

import { DataRangeMissingType }	from '../types/data-range-missing-type';
import { DataRangeSourceType }	from '../types/data-range-source-type';

import { DataRangeMonth }		from '../utils/data-range-month';
import { DataRangeMonthInfo }		from '../models/data-range-month-info';
import { DataRangeMonthInitInfo }	from '../models/data-range-month-init-info';

import { calcMonthDistance, calcMonthFromDistance } from '../utils/data-range-utils';

@Injectable({
  providedIn: 'root'
})

export class DataRangeService {
  #rangeOldest  : DataRangeMonthInfo;
  #latestOffset : number;

  readonly range  : DataRangeInfo;

  readonly latest : DataRangeMonth;
  readonly oldest : DataRangeMonth;

  readonly missing : Record<number, boolean> = {};

  readonly source : DataRangeSourceType[] = [];

  readonly monthColor  : string[] = [];
  readonly monthSource : string[] = [];

  constructor() {
    const range  = inject(DATA_CONFIG).range;
    this.range   = range;

    const oldest = range.oldest;
    const latest = range.latest;

    this.#rangeOldest  = oldest;
    this.#latestOffset = calcMonthDistance(oldest, latest);

    const missing = this.missing;

    range.missing?.forEach((item:DataRangeMissingType) => {
      const offset = calcMonthDistance(oldest, item[DataRangeMissingEnum.Month])
      missing[offset] = true;
    });

    this.oldest = this.dataRangeMonth(oldest);
    this.latest = this.dataRangeMonth(latest);

    if (range.source) {
      const sources = range.source;

      this.source = sources;

      const mColors  = this.monthColor;
      const mSources = this.monthSource;

      for (let i = sources.length - 1; i >= 0; i--) {
        const [ f, t, s, c ] = sources[i]; // from, to, source, color

        const offsetStart = calcMonthDistance(oldest, f);
        const offsetEnd   = calcMonthDistance(oldest, t);;

        for (let j = offsetStart; j <= offsetEnd; j++) {
          mColors[j]  = c;
          mSources[j] = s;
        }
      }
    }
  }


  /* ------------------------------------------------------------------ */
  /* DataRangeMonth constructors                                        */
  /* ------------------------------------------------------------------ */

  dataRangeMonth(month: DataRangeMonthInfo, check?:boolean):DataRangeMonth {
    const offset = (month.offset !== undefined) ? month.offset : calcMonthDistance(this.#rangeOldest, month);
    const valid  = check ? this.validOffset(offset) : undefined;

    const init: DataRangeMonthInitInfo = { service: this, year: month.year, month: month.month, offset, valid };
    return new DataRangeMonth(init);
  }

  dataRangeMonthFromOffset(offset:number, check?:boolean):DataRangeMonth {
    const month = calcMonthFromDistance(this.#rangeOldest, offset);
    const valid = check ? this.validOffset(offset) : undefined;

    const init: DataRangeMonthInitInfo = { service: this, year: month.year, month: month.month, offset, valid };
    return new DataRangeMonth(init);
  }


  /* ------------------------------------------------------------------ */

  prevDataRangeMonth(month: DataRangeMonthInfo, valid?:boolean):DataRangeMonth | undefined {
    const offset = (month.offset !== undefined) ? month.offset : calcMonthDistance(this.#rangeOldest, month);
    return this.prevDataRangeMonthFromOffset(offset, valid);
  }

  nextDataRangeMonth(month: DataRangeMonthInfo, valid?:boolean):DataRangeMonth | undefined {
    const offset = (month.offset !== undefined) ? month.offset : calcMonthDistance(this.#rangeOldest, month);
    return this.nextDataRangeMonthFromOffset(offset, valid);
  }

  prevDataRangeMonthFromOffset(offset:number, valid?:boolean):DataRangeMonth | undefined {
    offset--;

    if (valid) {
      const missing = this.missing;
      while(missing[offset]) { offset--; }

      if (offset < 0) { return; }
    }

    const month = calcMonthFromDistance(this.#rangeOldest, offset);

    valid = valid ? true : undefined;

    const init : DataRangeMonthInitInfo = { service: this, year: month.year, month: month.month, offset, valid };
    return new DataRangeMonth(init);
  }

  nextDataRangeMonthFromOffset(offset:number, valid?:boolean):DataRangeMonth | undefined {
    offset++;

    if (valid) {
      const missing = this.missing;
      while(missing[offset]) { offset++; }

      const latest = this.#latestOffset;
      if (offset > latest) { return; }
    }

    const month = calcMonthFromDistance(this.#rangeOldest, offset);

    valid = valid ? true : undefined;

    const init : DataRangeMonthInitInfo = { service: this, year: month.year, month: month.month, offset, valid };
    return new DataRangeMonth(init);
  }


  /* ------------------------------------------------------------------ */
  /* ------------------------------------------------------------------ */

  monthOffset(month: DataRangeMonthInfo, from?: DataRangeMonthInfo): number {
    return calcMonthDistance(from || this.#rangeOldest, month);
  }

  validOffset(offset: number):boolean {
    if (offset < 0)                   	{ return false; }
    if (offset > this.#latestOffset)   	{ return false; }

    if (this.missing[offset])       	{ return false; }

    return true;
  }


  /* ------------------------------------------------------------------ */
  /* ------------------------------------------------------------------ */

  validYear(year: number) {
    if (year < this.oldest.year) { return false; }
    if (year > this.latest.year) { return false; }

    return true;
  }

  validMonth(year: number, month:number):boolean {
    return this.dataRangeMonth({ year, month }).isValid();
  }


  /* ------------------------------------------------------------------ */
  /* guard utils                                                        */
  /* ------------------------------------------------------------------ */

  nextBestYear(year:number) : number | undefined {
    if (this.validYear(year)) { return year; }

    if (year < this.oldest.year) { return this.oldest.year; }

    return this.latest.year;
  }

  nextBestDataRangeMonth(month:DataRangeMonthInfo):DataRangeMonth | undefined {
    const offset = month.offset || calcMonthDistance(this.#rangeOldest, month);

    if (offset < 0) {
      return this.dataRangeMonth(this.oldest);

    } else if (offset > this.#latestOffset) {
      return this.dataRangeMonth(this.latest);
    }

    return this.nextDataRangeMonthFromOffset(offset, true) ||
           this.prevDataRangeMonthFromOffset(offset, true);
  }


  /* ------------------------------------------------------------------ */
  /* ------------------------------------------------------------------ */

  prevYear(year:number): number | undefined {
    year--;

    if (year >= this.oldest.year) { return year; }

    return;
  }

  nextYear(year:number): number | undefined {
    year++;

    if (year <= this.latest.year) { return year; }

    return;
  }


  /* ------------------------------------------------------------------ */
  /* ------------------------------------------------------------------ */

  availableMonths(year:number, fill=false):DataRangeMonth[] {
    if (year < this.oldest.year) { return []; }
    if (year > this.latest.year) { return []; }

    let fr = 1;
    let to = 12;

    if (!fill) {
      if (year == this.oldest.year) { fr = this.oldest.month; }
      if (year == this.latest.year) { to = this.latest.month; }
    }

    const list = [];

    for (let m = fr; m <= to; m++) {
      const drm = this.dataRangeMonth({ year, month : m }, true);

      if (fill || drm.valid) { list.push(drm); }
    }

    return list;
  }
}
