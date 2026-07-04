import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LayoutHeader } from './layout/components/layout-header/layout-header';
import { LayoutFooter } from './layout/components/layout-footer/layout-footer';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, LayoutHeader, LayoutFooter ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected title = 'Usenet.dex.de';
}
