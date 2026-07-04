import { ValueProvider } from '@angular/core';

import { DATA_CONFIG } from '../constants/data-config';

export function provideMockDataConfig():ValueProvider {
  return {
    provide : DATA_CONFIG,
    useValue : {
        range : {
        oldest : { year : 2000, month :  3 },
        latest : { year : 2009, month : 10 },
        missing : [
          [ { year : 2001, month : 10 } ],
          [ { year : 2001, month : 11 } ],
          [ { year : 2001, month : 12 } ],
          [ { year : 2002, month :  1 } ],
          [ { year : 2005, month :  5 } ],
        ]
      },
      valid : [ 'de.ALL', 'de.test' ]
    }
  }
}

export { DATA_CONFIG };
