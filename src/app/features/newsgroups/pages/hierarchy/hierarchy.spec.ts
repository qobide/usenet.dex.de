import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { provideMockActivatedRoute } from '../../../../core/mocks/activated-route';
import { provideMockDataConfig     } from '../../../../shared/mocks/data-config';

import { hierarchy } from '../../fixtures/hierarchy.fixtures';

import { Hierarchy } from './hierarchy';

describe('Hierarchy', () => {
  let component: Hierarchy;
  let fixture: ComponentFixture<Hierarchy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hierarchy,RouterTestingModule, HttpClientTestingModule],
      providers : [ provideMockDataConfig(), provideMockActivatedRoute({
        data : { detail : hierarchy },
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
