import { Pipe, PipeTransform } from '@angular/core';

import { DataRangeMissingString } from '../constants/data-range-missing-string';

@Pipe({ name: 'dataRangeMissingLabel' })

export class DataRangeMissingLabelPipe implements PipeTransform {
  transform(value: string): string {
    return DataRangeMissingString[value] ?? value;
  }
}
