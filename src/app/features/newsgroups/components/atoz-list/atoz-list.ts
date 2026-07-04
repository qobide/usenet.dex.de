import { Component, input, signal, linkedSignal, computed } 	from '@angular/core';
import { FormsModule } 						from '@angular/forms';

import { SortController }   	from '../../../../shared/components/sort-controller/sort-controller';
import { SortDirectionEnum }	from '../../../../shared/constants/sort-direction-enum';

import { AtoZSortEnum }		 from '../../constants/atoz-sort-enum';
import { AtoZSortOptionsAny }	 from '../../constants/atoz-sort-options-any';
import { AtoZSortOptionsActive } from '../../constants/atoz-sort-options-active';

import { AtoZActivityEnum } 	from '../../constants/atoz-activity-enum';

import { AtoZItemInfo } 	from '../../models/atoz-item-info';
import { AtoZItem }     	from '../../components/atoz-item/atoz-item';

@Component({
  selector: 'app-atoz-list',
  imports: [ FormsModule, AtoZItem, SortController ],
  templateUrl: './atoz-list.html',
  styleUrl: './atoz-list.scss'
})

export class AtoZList {
  label = input<string>();
  list  = input.required<AtoZItemInfo[]>();

  filterName = signal('');

  defaultActivity = input<AtoZActivityEnum>(AtoZActivityEnum.Any);
  selectedActivity = linkedSignal<AtoZActivityEnum>(() => this.defaultActivity());

  listActivity = computed(() => {
    const list = this.list();

    let activity = AtoZActivityEnum.Any;

    const alen = list.filter((item) => item.active).length;

    switch (alen) {
      case 0: // only inactive
        activity = AtoZActivityEnum.Inactive;
        break;

      case list.length: // only active
        activity = AtoZActivityEnum.Active;
        break;
     }

     return activity;
  });

  showSwitcher = computed(() => this.listActivity() === AtoZActivityEnum.Any );

  switcherOptions = [
    { label : 'aktiv',   type : AtoZActivityEnum.Active },
    { label : 'alle',    type : AtoZActivityEnum.Any },
    { label : 'inaktiv', type : AtoZActivityEnum.Inactive },
  ];

  filteredList = computed(() => {
    let list = this.list();
    let name = this.filterName();

    if (name.length > 0) {
      name = name.toLocaleLowerCase();
      list = list.filter(((item) => item.name.indexOf(name) >= 0));
    }

    // no filter needed when list is all active or all inactive
    if (this.listActivity() != AtoZActivityEnum.Any) { return list; }

    switch (this.selectedActivity()) {
      case AtoZActivityEnum.Active:
        return list.filter((item) => item.active);

      case AtoZActivityEnum.Inactive:
        return list.filter((item) => !item.active);
    }

    return list;
  });

  sortOptions = computed(() => {
    return (this.selectedActivity() == AtoZActivityEnum.Active) ? AtoZSortOptionsActive : AtoZSortOptionsAny;
  });

  sortSelected = linkedSignal({ source : this.sortOptions, computation : (sortOptions, prev) => {
    if (!prev) { return AtoZSortEnum.Name; } // initializing

    const prevSelected = prev.value;

    // wenn die sortoptions alles erlauben, bleibt der value erhalten
    if (sortOptions === AtoZSortOptionsAny) { return prevSelected; }

    // ansonsten muessen wir prüfen ob AtoZSortEnum.To gesetzt war,
    // weil das in AtoZSortOptionsActive fehlt!

    if (prevSelected == AtoZSortEnum.To) { return AtoZSortEnum.Name; }

    return prevSelected;
  }});

  sortDirection = signal<SortDirectionEnum>(SortDirectionEnum.Ascending);

  sortedList = computed(() => {
    const list = this.filteredList().slice();

    const sort = this.sortSelected();
    const dir  = this.sortDirection();

    switch (sort) {
      case AtoZSortEnum.Name :
        if (dir == SortDirectionEnum.Descending) {
          list.sort((a, b) => b.name.localeCompare(a.name))
        }
        break;

      case AtoZSortEnum.From :
        if (dir == SortDirectionEnum.Ascending) {
          list.sort((a, b) => (a.range.from.year - b.range.from.year || a.range.from.month - b.range.from.month));

        } else {
          list.sort((a, b) => (b.range.from.year - a.range.from.year || b.range.from.month - a.range.from.month));
        }

        break;

      case AtoZSortEnum.To :
        if (dir == SortDirectionEnum.Ascending) {
          list.sort((a, b) => (a.range.to.year - b.range.to.year || a.range.to.month - b.range.to.month));

        } else {
          list.sort((a, b) => (b.range.to.year - a.range.to.year || b.range.to.month - a.range.to.month));
       }

      break;
    }

    return list;
  });

}
