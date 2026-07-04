import { inputBinding } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyTitle } from './hierarchy-title';

describe('HierarchyTitle', () => {
  let component: HierarchyTitle;
  let fixture: ComponentFixture<HierarchyTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HierarchyTitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HierarchyTitle, {
      bindings: [ inputBinding('name', () => 'testing' ) ]
    });

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
