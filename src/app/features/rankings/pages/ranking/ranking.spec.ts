import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockActivatedRoute } from '../../../../core/mocks/activated-route';
import { provideMockDataConfig     } from '../../../../shared/mocks/data-config';

import { rankings } from '../../fixtures/rankings.fixtures';

import { Ranking } from './ranking';

describe('Ranking', () => {
  let component: Ranking;
  let fixture: ComponentFixture<Ranking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ranking],
      providers: [ provideMockDataConfig(), provideMockActivatedRoute({
        data : { rankings }
      })]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ranking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
