import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockActivatedRoute } from '../../../core/mocks/activated-route';
import { provideMockDataConfig }     from '../../../shared/mocks/data-config';

import { home } from '../../../features/website/fixtures/home.fixtures';

import { LayoutHeader } from './layout-header';

describe('LayoutHeader', () => {
  let component: LayoutHeader;
  let fixture: ComponentFixture<LayoutHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutHeader],
      providers: [ provideMockDataConfig(),
        provideMockActivatedRoute({ data : { home } }) ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
