import { inputBinding } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortController } from './sort-controller';

describe('SortController', () => {
  let component: SortController<boolean>;
  let fixture: ComponentFixture<SortController<boolean>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortController]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortController<boolean>, {
      bindings: [ inputBinding('options', () => []), inputBinding('selected', () => true) ]
    });

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
