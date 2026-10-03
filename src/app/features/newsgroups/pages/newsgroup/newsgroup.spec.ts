import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { provideMockActivatedRoute } from '../../../../core/mocks/activated-route';
import { provideMockDataConfig }     from '../../../../shared/mocks/data-config';

import { newsgroup } from '../../fixtures/newsgroup.fixtures';

import { Newsgroup } from './newsgroup';

describe('Newsgroup', () => {
  let component: Newsgroup;
  let fixture: ComponentFixture<Newsgroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newsgroup,RouterTestingModule],
      providers: [ provideMockDataConfig(), provideMockActivatedRoute({
        data : { detail : newsgroup },
        params : { name : 'de.mock' }
      })]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Newsgroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
