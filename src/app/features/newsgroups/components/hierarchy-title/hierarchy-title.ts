import { Component, inject, input, computed } 	from '@angular/core';
import { RouterModule }				from '@angular/router';

import { CoreApiDataService } 	from '../../../../core/apis/data-service';
import { FormatDataMonthPipe }  from '../../../../shared/pipes/format-data-month-pipe';

import { AtoZRangeInfo } 	from '../..//models/atoz-range-info';

@Component({
  selector: 'app-hierarchy-title',
  imports: [ RouterModule, FormatDataMonthPipe ],
  templateUrl: './hierarchy-title.html',
  styleUrl: './hierarchy-title.scss'
})

export class HierarchyTitle {
  #data = inject(CoreApiDataService);

  name   = input.required<string>();
  active = input<boolean>(true);
  range  = input<AtoZRangeInfo>();

  csvURL = computed(() => {
    const name = this.name();
    return this.#data.csvURL(name);
  });

  path = computed(() => {
    return this.name().split('.');
  });

  title = computed(() => {
    const path = this.path().slice();

    let last = path.pop() || '';
    if (last === 'ALL') { last = path.pop() + '.ALL' }

    return last;
  });

  segments = computed(() => {
    const path = this.path().slice();

    const last = path.pop() || '';
    if (last === 'ALL') { path.pop(); }

    const segments = [];

    while (path.length) {
      const path_seg  = path[path.length-1];
      const hier_name = path.join('.') + '.ALL';

      segments.unshift({ name : hier_name, segment : path_seg });
      path.pop();
    }

    return segments;
  });
}
