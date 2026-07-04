import { TestBed } from '@angular/core/testing';

import { provideMockDataConfig }  from '../mocks/data-config';

import { DataRangeService } 	from '../services/data-range-service';
import { DataRangeMonth } 	from '../utils/data-range-month';

describe('DataRangeMonth', () => {
  let service: DataRangeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ provideMockDataConfig() ]
    }).compileComponents();

    service = TestBed.inject(DataRangeService);
  });

  it('should create an instance', () => {
    const first = service.dataRangeMonth({ year : 2000, month :  1 });
    const last  = service.dataRangeMonth({ year : 2009, month : 12 });

    const fromOff = service.dataRangeMonthFromOffset(10);

    expect(first).toBeInstanceOf(DataRangeMonth);
    expect(last).toBeInstanceOf(DataRangeMonth);
    expect(fromOff).toBeInstanceOf(DataRangeMonth);
  });

  it('should have offset', () => {
    expect(service.dataRangeMonth({ year : 2000, month :  1 }).offset).toBe(-2);
    expect(service.dataRangeMonth({ year : 2000, month :  3 }).offset).toBe( 0);
    expect(service.dataRangeMonth({ year : 2000, month :  5 }).offset).toBe( 2);

    expect(service.dataRangeMonth({ year : 2001, month : 10 }).offset).toBe(19);

    expect(service.dataRangeMonth({ year : 2009, month :  9 }).offset).toBe(114);
    expect(service.dataRangeMonth({ year : 2009, month : 10 }).offset).toBe(115);
    expect(service.dataRangeMonth({ year : 2009, month : 11 }).offset).toBe(116);
  });

  it('should have date', () => {
    const from = service.dataRangeMonthFromOffset(10);

    expect(from.year).toBe(2001);
    expect(from.month).toBe(1);
  });

  it('should be valid', () => {
    expect(service.dataRangeMonth({ year : 2000, month :  3 }).isValid()).toBeTrue();
    expect(service.dataRangeMonth({ year : 2009, month : 10 }).isValid()).toBeTrue();

    expect(service.dataRangeMonth({ year : 2000, month :  1 }).isValid()).toBeFalse();
    expect(service.dataRangeMonth({ year : 2005, month :  5 }).isValid()).toBeFalse();
  });

  it('should have next/prev', () => {
    const base = service.dataRangeMonth({ year : 2001, month : 12 });

    const next = base.next();
    expect(next).toBeTruthy();

    if (next) {
      expect(next?.year).toBe(2002);
      expect(next?.month).toBe(1);

      const prev = next.prev();
      expect(prev).toBeTruthy();

      if (prev) {
        expect(prev?.year).toBe(2001);
        expect(prev?.month).toBe(12);
      }
    }
  });

  it('should be valid next/prev', () => {
    const base = service.dataRangeMonth({ year : 2001, month : 12 });

    let next = base.next(true);
    expect(next).toBeTruthy();

    if (next) {
      expect(next?.year).toBe(2002);
      expect(next?.month).toBe(2);

      const prev = next.prev(true);
      expect(prev).toBeTruthy();

      if (prev) {
        expect(prev?.year).toBe(2001);
        expect(prev?.month).toBe(9);
      }
    }

    const under = service.dataRangeMonth({ year : 1999, month : 1 });
    const prev = under.prev(true);

    expect(prev).toBeUndefined();

    const over = service.dataRangeMonth({ year : 2020, month : 3 });
          next = over.next(true);

    expect(next).toBeUndefined();
  });

});
