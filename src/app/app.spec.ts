import { TestBed } 		from '@angular/core/testing';
import { RouterTestingModule, RouterTestingHarness }
				from "@angular/router/testing";

import { provideMockDataConfig }  from './shared/mocks/data-config';

import { App } 			from './app';

import { Home }			from './features/website/pages/home/home';
import { homeResolver }		from './features/website/resolvers/home-resolver';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, RouterTestingModule.withRoutes([{ 'path' : '', 'component' : Home, resolve : { home : homeResolver } }]) ],
      providers: [ provideMockDataConfig() ]
    }).compileComponents();

    await RouterTestingHarness.create('/');
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

/*

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Usenet.dex.de');
  });

*/
});
