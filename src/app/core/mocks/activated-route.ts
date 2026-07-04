import { ValueProvider } from '@angular/core';

import { ActivatedRoute, Data, Params, ParamMap, convertToParamMap } from '@angular/router';
import { Subject } from 'rxjs';

export class MockActivatedRoute {
  readonly snapshot : {
             data : Data;
           params : Params,
         paramMap : ParamMap,
      queryParams : Params,
    queryParamMap : ParamMap
  } = {
             data : {},
           params : {},
         paramMap : convertToParamMap({}),
      queryParams : {},
    queryParamMap : convertToParamMap({})
  };

  private dataSubject          = new Subject<Data>();
  private paramsSubject        = new Subject<Params>();
  private paramMapSubject      = new Subject<ParamMap>();
  private queryParamsSubject   = new Subject<Params>();
  private queryParamMapSubject = new Subject<ParamMap>();

  readonly data          = this.dataSubject.asObservable();
  readonly params        = this.paramsSubject.asObservable();
  readonly paramMap      = this.paramMapSubject.asObservable();
  readonly queryParams   = this.paramsSubject.asObservable();
  readonly queryParamMap = this.paramMapSubject.asObservable();

  setRoute(route: string, params: Params = {}, queryParams: Params = {}, data: Data = {}) {
    const paramMap      = convertToParamMap(params);
    const queryParamMap = convertToParamMap(queryParams);

    this.dataSubject.next(data);
    this.paramsSubject.next(params);
    this.paramMapSubject.next(paramMap);
    this.queryParamsSubject.next(queryParams);
    this.queryParamMapSubject.next(queryParamMap);

    this.snapshot.data          = data;
    this.snapshot.params        = params;
    this.snapshot.paramMap      = paramMap;
    this.snapshot.queryParams   = queryParams;
    this.snapshot.queryParamMap = queryParamMap;
  }

  // https://gist.github.com/rossholdway/89a50d466d55bbed8d402c2d81f44741
}

export function provideMockActivatedRoute(args:{ data?:Data, params?:Params, queryParams?:Params }):ValueProvider {
  const route = new MockActivatedRoute();
        route.setRoute('', args.params, args.queryParams, args.data);

  return { provide : ActivatedRoute, useValue : route };
};

export { ActivatedRoute };
