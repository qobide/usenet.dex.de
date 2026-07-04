import { ComponentFixture, TestBed } 	from '@angular/core/testing';
import { RouterTestingModule } 		from "@angular/router/testing";

import { AtoZItem } 		from './atoz-item';

describe('AtoZItem', () => {
  let component: AtoZItem;
  let fixture: ComponentFixture<AtoZItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtoZItem, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtoZItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('atozItem', {
      'name' : 'de.testing',
      'range' : {
        'from' : { 'year' : 1900, 'month' : 1 },
        'to'   : { 'to'   : 2000, 'month' : 12 }
      },
      'active' : false
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
