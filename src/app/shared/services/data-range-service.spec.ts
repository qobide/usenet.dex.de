import { TestBed } from '@angular/core/testing';

import { provideMockDataConfig } from '../mocks/data-config';

import { DataRangeService } 	from './data-range-service';
import { DataRangeMonth } 	from '../utils/data-range-month';
import { DataRangeInfo } 	from '../models/data-range-info';

describe('DataRangeService', () => {
  let service: DataRangeService;
  let range:   DataRangeInfo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ provideMockDataConfig() ]
    });

    service = TestBed.inject(DataRangeService);
    range   = service.range;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have range', () => {
    expect(service.range).toBeTruthy();

    expect(service.range.oldest).toBeTruthy();
    expect(service.range.oldest.year).toBe(2000);
    expect(service.range.oldest.month).toBe(3);

    expect(service.range.latest).toBeTruthy();
    expect(service.range.latest.year).toBe(2009);
    expect(service.range.latest.month).toBe(10);
  });

  it('should create dataRangeMonth', () => {
    const drm = service.dataRangeMonth({ year: 1992, month: 5 });
    expect(drm).toBeTruthy();
    expect(drm.year).toBe(1992);
    expect(drm.month).toBe(5);
  });

  it('validYear', () => {
    expect(service.validYear(range.oldest.year)).toEqual(true);
    expect(service.validYear(range.oldest.year-1)).withContext('before').toEqual(false);
    expect(service.validYear(range.latest.year+1)).withContext('after').toEqual(false);
  });

  it('validMonth', () => {
    expect(service.validMonth(range.oldest.year, range.oldest.month)).toEqual(true);
    expect(service.validMonth(range.oldest.year-1, 12)).withContext('before').toEqual(false);
    expect(service.validMonth(range.latest.year+1, 1)).withContext('after').toEqual(false);
  });

  it('nextBestYear', () => {
    expect(service.nextBestYear(range.oldest.year-2)).withContext('before').toEqual(range.oldest.year);
    expect(service.nextBestYear(range.latest.year+2)).withContext('after').toEqual(range.latest.year);
  });

  it('nextBestDataRangeMonth', () => {
    const next_before = service.nextBestDataRangeMonth({ year: range.oldest.year-2, month:  1 });
    const next_after  = service.nextBestDataRangeMonth({ year: range.latest.year+2, month: 12 });

    expect(next_before instanceof DataRangeMonth).toBeTrue();
    expect(next_after  instanceof DataRangeMonth).toBeTrue();

    expect(next_before).withContext('before').toEqual(jasmine.objectContaining(range.oldest));
    expect(next_after ).withContext('after' ).toEqual(jasmine.objectContaining(range.latest));
  });
});
