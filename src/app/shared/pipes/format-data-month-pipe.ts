import { Pipe, PipeTransform } from '@angular/core';

import { DataMonthsFull, DataMonthsShort } from '../constants/data-months';

import { DataRangeMonthInfo} from '../models/data-range-month-info';

@Pipe({
  name: 'formatDataMonth'
})

export class FormatDataMonthPipe implements PipeTransform {

  transform(value: DataRangeMonthInfo, format='full'): string {
    if (!value) { return value; }

    const {year,month} = value;

    if (format == 'shortMonth') { return DataMonthsShort[month]; }
    if (format == 'fullMonth' ) { return DataMonthsFull[month];  }

    const lookup = (format == 'short') ? DataMonthsShort : DataMonthsFull;

    return lookup[month] + ' ' + year;
  }
}
