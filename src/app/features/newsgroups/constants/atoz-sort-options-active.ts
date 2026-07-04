import { SortControllerOption } from '../../../shared/models/sort-controller-option';

import { AtoZSortEnum } from './atoz-sort-enum';

export const AtoZSortOptionsActive : SortControllerOption<AtoZSortEnum>[] = [{
    label : 'Name',
    value : AtoZSortEnum.Name
  },{
    label : 'Von',
    value : AtoZSortEnum.From
  }];
