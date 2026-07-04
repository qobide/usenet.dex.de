import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { provideMockActivatedRoute } from '../../../../core/mocks/activated-route';
import { provideMockDataConfig }     from '../../../../shared/mocks/data-config';

import { Newsgroup } from './newsgroup';

describe('Newsgroup', () => {
  let component: Newsgroup;
  let fixture: ComponentFixture<Newsgroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newsgroup,RouterTestingModule],
      providers: [ provideMockDataConfig(), provideMockActivatedRoute({
        data : {
          detail : {
            name  : 'de.mock',
            range : { from : { year : 2001, month : 1 }, to : { year : 2002, month : 2 } },
            active : true,
            months : []
          }
        },
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
