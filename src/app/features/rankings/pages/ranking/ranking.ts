import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule  }
				from '@angular/router';

import { Rankings }      from '../../components/rankings/rankings';
import { RankingSelect }        from '../../components/ranking-select/ranking-select';

import { RankingsInfo }  from '../../models/rankings-info';

@Component({
  selector: 'app-ranking',
  imports: [ RouterModule, Rankings, RankingSelect ],
  templateUrl: './ranking.html',
  styleUrl: './ranking.scss'
})

export class Ranking implements OnInit {
  #route = inject(ActivatedRoute);

  rankings! : RankingsInfo;

  ngOnInit():void {
    this.rankings = this.#route.snapshot.data['rankings'];
  }
}
