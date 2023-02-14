
import { Games } from './games';
import { Team } from './teams';

export interface ResponseTeamApi {
  data: Team[];
  meta?: Meta;
}
export interface ResponseGameApi {
  data: Games[];
  meta?: Meta;
  idTeam?:number;
}

export interface Meta {
  total_pages?: number;
  current_page?: number;
  next_page?: number;
  per_page?: number;
  total_count?: number;
}
