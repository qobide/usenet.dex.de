import { DataMonthsFull, DataMonthsShort } 	from '../constants/data-months';

import { DataRangeMonthInfo } 		from '../models/data-range-month-info';
import { DataRangeMonthInitInfo }	from '../models/data-range-month-init-info';

export class DataRangeMonth implements DataRangeMonthInfo {
  #service : any; 	/* eslint-disable-line @typescript-eslint/no-explicit-any */

  year	 : number;
  month  : number;

  offset : number;

  full   : string;
  short  : string;

  valid  : boolean | undefined;

  constructor(init: DataRangeMonthInitInfo) {
    this.#service = init.service;

    this.year   = init.year;
    this.month  = init.month;

    this.offset = init.offset;
    this.valid  = init.valid;

    this.full   = DataMonthsFull[ init.year];
    this.short  = DataMonthsShort[init.month];
  }

  isValid() : boolean {
    return (this.valid !== undefined) ? this.valid :  this.#service.validOffset(this.offset);
  }

  next(valid?:boolean) : ( DataRangeMonth | undefined ) {
    return this.#service.nextDataRangeMonth(this, valid);
  }

  prev(valid?:boolean) : ( DataRangeMonth | undefined ) {
    return this.#service.prevDataRangeMonth(this, valid);
  }
}
