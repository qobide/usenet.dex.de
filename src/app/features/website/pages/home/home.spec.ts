import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule }       from "@angular/router/testing";

import { provideMockActivatedRoute } from '../../../../core/mocks/activated-route';
import { provideMockDataConfig }     from '../../../../shared/mocks/data-config';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home,RouterTestingModule],
      providers: [ provideMockDataConfig(),
        provideMockActivatedRoute({ data : { home : { top10 : [] } } }) ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have top10', () => {
    expect(component.top10).toBeTruthy();
  });

  it('should have latest (range)', () => {
    expect(component.latest).toBeTruthy();
  });

});
