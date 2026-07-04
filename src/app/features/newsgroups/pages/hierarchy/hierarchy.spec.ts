import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { provideMockActivatedRoute } from '../../../../core/mocks/activated-route';
import { provideMockDataConfig     } from '../../../../shared/mocks/data-config';

import { Hierarchy } from './hierarchy';

describe('Hierarchy', () => {
  let component: Hierarchy;
  let fixture: ComponentFixture<Hierarchy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hierarchy,RouterTestingModule, HttpClientTestingModule],
      providers : [ provideMockDataConfig(), provideMockActivatedRoute({
        data : {
          detail : {
            name   : 'de.mock.ALL',
            range  : { from : { year : 2000, month : 1 }, to : { year : 2001, month : 2 } },
            active : true,
            atoz   : []
          }
        },
        params : { name : 'de.mock.ALL' }
      }) ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hierarchy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have name', () => {
    expect(component.name).toBe('de.mock.ALL');
  });
});
