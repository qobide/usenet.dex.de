import { Component, input, model, linkedSignal } from '@angular/core';

import { SortDirectionEnum } from '../../constants/sort-direction-enum';

import { SortControllerOption } from '../../models/sort-controller-option';
import { SortControllerButton } from '../../models/sort-controller-button';

@Component({
  selector: 'app-sort-controller',
  imports: [],
  templateUrl: './sort-controller.html',
  styleUrl: './sort-controller.scss',
})

export class SortController<T> {
  options   = input.required<SortControllerOption<T>[]>();
  selected  = model.required<T>();
  direction = model<SortDirectionEnum>(SortDirectionEnum.Ascending);

  directionEnum = SortDirectionEnum;

  buttons = linkedSignal<SortControllerOption<T>[],SortControllerButton<T>[]>({ source : this.options, computation : (options, prev) => {
    let buttons : SortControllerButton<T>[] = [];

    if (!prev) {
      buttons = options.map((item) => {
        return { label : item.label, value : item.value, direction : item.direction ?? SortDirectionEnum.Ascending };
      });

    } else {
      if (prev.source !== options) {
        const oldButtons = prev.value;

        buttons = [];

        options.forEach((item) => {
          const oldButton = oldButtons.find((oldItem) => oldItem.value == item.value);

          if (oldButton) {
             buttons.push(oldButton);

          } else {
             buttons.push({ label : item.label, value : item.value, direction : item.direction ?? SortDirectionEnum.Ascending });
          }
        });

      } else {
        buttons = prev.value;
      }
    }

    return buttons;
  }});

  select(value:T):void {
    const buttons   = this.buttons();
    const selected  = this.selected();

    const button = buttons.find((item) => item.value == value);
    if (!button) { return; }

    if (value == selected) { // flip direction
      const direction = (button.direction == SortDirectionEnum.Ascending) ? SortDirectionEnum.Descending : SortDirectionEnum.Ascending;

      button.direction = direction;

      this.direction.set(direction);
      this.buttons.set(buttons);

    } else {
      this.selected.set(value);
      this.direction.set(button.direction); // restore direction
    }
  }
}
