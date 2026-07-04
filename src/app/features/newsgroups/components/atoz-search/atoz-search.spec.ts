import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtoZSearch } from './atoz-search';

describe('AtoZSearch', () => {
  let component: AtoZSearch;
  let fixture: ComponentFixture<AtoZSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtoZSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtoZSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
