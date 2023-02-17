import { Injectable } from '@angular/core';
import { ResponseGameApi } from '../models/response';
import { Team } from '../models/teams';

@Injectable({
  providedIn: 'root',
})
export class TeamCodeService {
  teamCodes: Array<ResponseGameApi> = [];
  constructor() {
    const data = localStorage.getItem('gameResponses');

    if (data !== null) {
      this.teamCodes = JSON.parse(data);
    }
  }

  getAllTeams() {
    return this.teamCodes;
  }

  addTeamCode(gameResponses: ResponseGameApi) {
    this.teamCodes.push(gameResponses);

    localStorage.setItem('gameResponses', JSON.stringify(this.teamCodes));
  }
  // deleteTeamCode(xxx:ResponseGameApi) {
  //   localStorage.removeItem('gameResponses');
  // }
}
