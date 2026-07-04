import { SortControllerOption } from '../../../shared/models/sort-controller-option';

import { AtoZSortEnum } from './atoz-sort-enum';

export const AtoZSortOptionsAny : SortControllerOption<AtoZSortEnum>[] = [{
    label : 'Name',
    value : AtoZSortEnum.Name
  },{
    label : 'Von',
    value : AtoZSortEnum.From
  },{
    label : 'Bis',
    value : AtoZSortEnum.To
  }];
