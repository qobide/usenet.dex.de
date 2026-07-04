import { Component, inject, OnInit } from '@angular/core';

import { DATA_CONFIG } from '../../../../shared/constants/data-config';

@Component({
  selector: 'app-atoz-search',
  imports: [],
  templateUrl: './atoz-search.html',
  styleUrl: './atoz-search.scss',
})


export class AtoZSearch implements OnInit {
  #config = inject(DATA_CONFIG);

  atoz : string[] = [];

  ngOnInit():void {
    this.atoz = this.#config.valid;
  }
}
