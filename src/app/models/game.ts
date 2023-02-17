export interface Game {
  idTeam?: number;
  abbreviation?: string;
  full_name?: string;
  conference?: string;
  avgScore?: number;
  cancededScore?: number;
  avatar?: string;
  scores?:string[];
  // scores?:Array<string>;
}
