import { Injectable } from '@angular/core';
import { Team } from '../models/teams';
import { BehaviorSubject, Subject } from 'rxjs';
import { NBAService } from '../http/nba.service';
import { ResponseTeamApi } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class TeamDataService {
  // private _teams: Subject<Team[]> = new Subject();
  private _teams: BehaviorSubject<Team[] | null> = new BehaviorSubject<
    Team[] | null
  >([]);
  public teams = this._teams.asObservable();

  constructor(private nbaService: NBAService) {
    this.loadTeams();
  }

  private loadTeams() {
    this.nbaService.getTeam().subscribe((response: ResponseTeamApi) => {
      this._teams.next(response.data);
    });
  }
}
