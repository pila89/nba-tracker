export interface Games {
  id?: number;
  date?: string;
  home_team: {
    id?: number;
    abbreviation?: string;
    city?: string;
    conference?: string;
    division?: string;
    full_name?: string;
    name?: string;
  };
  home_team_score: number;
  period?: number;
  postseason?: boolean;
  season?: number;
  status?: string;
  time?: string;
  visitor_team: {
    id?: number;
    abbreviation: string;
    city?: string;
    conference?: string;
    division?: string;
    full_name?: string;
    name?: string;
  };
  visitor_team_score: number;
}


