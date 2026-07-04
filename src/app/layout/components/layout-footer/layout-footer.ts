import { Component } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-layout-footer',
  imports: [],
  templateUrl: './layout-footer.html',
  styleUrl: './layout-footer.scss',
})

export class LayoutFooter {
  readonly appVersion = environment.appVersion;
}
