import { DataRangeMonthInfo } from '../models/data-range-month-info';

import { calcMonthDistance, calcMonthFromDistance } from './data-range-utils';

describe('data-range-utils', () => {
  const oldest : DataRangeMonthInfo = { year : 2000, month : 1 };


  it('calcMonthDistance', () => {
    expect(calcMonthDistance(oldest, { year : 1997, month : 10 })).toBe(-27);
    expect(calcMonthDistance(oldest, { year : 1999, month : 12 })).toBe( -1);
    expect(calcMonthDistance(oldest, { year : 2000, month :  1 })).toBe(  0);
    expect(calcMonthDistance(oldest, { year : 2000, month :  2 })).toBe(  1);
    expect(calcMonthDistance(oldest, { year : 2002, month :  4 })).toBe( 27);
  });

  it('calcMonthFromDistance', () => {
    expect(calcMonthFromDistance(oldest, -27)).toEqual({ year: 1997, month: 10 });
    expect(calcMonthFromDistance(oldest,  -1)).toEqual({ year: 1999, month: 12 });
    expect(calcMonthFromDistance(oldest,   0)).toEqual({ year: 2000, month:  1 });
    expect(calcMonthFromDistance(oldest,   1)).toEqual({ year: 2000, month:  2 });
    expect(calcMonthFromDistance(oldest,  27)).toEqual({ year: 2002, month:  4 });
  });

});
