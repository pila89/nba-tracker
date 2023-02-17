import { Injectable } from '@angular/core';
import { Team } from '../models/teams';

@Injectable({
  providedIn: 'root'
})
export class TeamDataService {
  private _teams: Team[] = [];
  constructor() { }

  getTeams() {
    return this._teams;
  }

  setTeams(teams: Team[]) {
    this._teams = teams;
  }
}
