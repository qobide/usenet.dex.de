import { DataRangeMonthInfo } from '../models/data-range-month-info';

export function calcMonthDistance(oldest:DataRangeMonthInfo, newest:DataRangeMonthInfo):number {
  return ( newest.year - oldest.year ) * 12 + newest.month - oldest.month;
}

export function calcMonthFromDistance(oldest:DataRangeMonthInfo, distance:number):DataRangeMonthInfo {
  let year  = oldest.year;
  let month = oldest.month;

  month += distance;

  month--;

  year  += Math.floor(month / 12);
  month = month % 12;

  month++;

  if (month <= 0) { month += 12; }

  return { year, month };
}
