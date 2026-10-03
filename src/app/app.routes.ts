import { Routes } 		from '@angular/router';

import { Home } 		from './features/website/pages/home/home';
import { homeResolver }		from './features/website/resolvers/home-resolver';

import { AtoZ } 		from './features/newsgroups/pages/atoz/atoz';
import { atozResolver } 	from './features/newsgroups/resolvers/atoz-resolver';

import { Newsgroup } 		from './features/newsgroups/pages/newsgroup/newsgroup';
import { NewsgroupGuard } 	from './features/newsgroups/guards/newsgroup-guard';
import { newsgroupResolver } 	from './features/newsgroups/resolvers/newsgroup-resolver';

import { Hierarchy } 		from './features/newsgroups/pages/hierarchy/hierarchy';
import { HierarchyGuard } 	from './features/newsgroups/guards/hierarchy-guard';
import { hierarchyResolver } 	from './features/newsgroups/resolvers/hierarchy-resolver';

import { Ranking } 	        from './features/rankings/pages/ranking/ranking';
import { rankingResolver }      from './features/rankings/resolvers/ranking-resolver';

import { RankingYear } 		from './features/rankings/pages/ranking-year/ranking-year';
import { RankingYearGuard }     from './features/rankings/guards/ranking-year-guard';
import { rankingYearResolver } 	from './features/rankings/resolvers/ranking-year-resolver';

import { RankingMonth } 	from './features/rankings/pages/ranking-month/ranking-month';
import { RankingMonthGuard }    from './features/rankings/guards/ranking-month-guard';
import { rankingMonthResolver }	from './features/rankings/resolvers/ranking-month-resolver';

export const routes: Routes = [
  {
    path: '',
    title: 'Usenet.dex.de',
    component: Home,
    resolve : { home : homeResolver },
  },
  {
    path: 'atoz',
    component: AtoZ,
    title: 'A-Z',
    resolve : { atoz : atozResolver },
  },
  {
    path: 'newsgroup/:name',
    component : Newsgroup,
    canMatch : [ NewsgroupGuard ],
    resolve : { detail : newsgroupResolver },
  },
  {
    path: 'newsgroup',
    redirectTo: '/atoz'
  },
  {
    path: 'hierarchy/:name',
    component: Hierarchy,
    canMatch : [ HierarchyGuard ],
    resolve : { detail : hierarchyResolver },
  },
  {
    path: 'hierarchy',
    redirectTo: '/atoz'
  },
  {
    path: 'ranking/:year/:month',
    component: RankingMonth,
    canMatch : [ RankingMonthGuard ],
    resolve : { ranking : rankingMonthResolver },
  },
  {
    path: 'ranking/:year',
    component: RankingYear,
    canMatch : [ RankingYearGuard ],
    resolve : { ranking : rankingYearResolver },
  },
  {
    path: 'ranking',
    component: Ranking,
    title : 'Rangfolgen',
    resolve : { rankings : rankingResolver },
  },
  {
    path: '**',
    redirectTo: ''
  },

];
