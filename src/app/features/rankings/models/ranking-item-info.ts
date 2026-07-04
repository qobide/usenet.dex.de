export interface RankingItemInfo {
  name: string;
  rank: number;
  last?:number;
  up?: number;
  down?: number;
  postings: number;
  gain?: number;
  share: number;
}
