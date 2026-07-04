import { Component, inject, OnInit } 	from '@angular/core';
import { ActivatedRoute } 	from '@angular/router';

import { AtoZActivityEnum }	from '../../constants/atoz-activity-enum';
import { AtoZItemInfo } 	from '../../models/atoz-item-info';
import { AtoZList }     	from '../../components/atoz-list/atoz-list';


@Component({
  selector: 'app-atoz',
  imports: [ AtoZList ],
  templateUrl: './atoz.html',
  styleUrl: './atoz.scss'
})

export class AtoZ implements OnInit {
  #route = inject(ActivatedRoute);

  atoz! : AtoZItemInfo[];

  activityEnum : typeof AtoZActivityEnum = AtoZActivityEnum;

  ngOnInit():void {
    this.atoz = this.#route.snapshot.data['atoz'] || [];
  }
}
