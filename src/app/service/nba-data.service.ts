import { Injectable } from '@angular/core';
import { ResponseGameApi } from '../models/response';
import { Team } from '../models/teams';

@Injectable({
  providedIn: 'root',
})
export class NBADataService {
  private gameResponses: Array<ResponseGameApi> = [];
  private teams: Team[] = [];
  constructor() {
    const data = localStorage.getItem('gameResponses');
    if (data !== null) {
      this.gameResponses = JSON.parse(data);
    }
  }

  getAllGames() {
    return this.gameResponses;
  }

  addGame(gameResponses: ResponseGameApi) {
    this.gameResponses.push(gameResponses);
    localStorage.setItem('gameResponses', JSON.stringify(this.gameResponses));
  }

  deleteGame(i: number) {
    this.gameResponses.splice(i, 1);
    localStorage.setItem('gameResponses', JSON.stringify(this.gameResponses));
  }

  getTeams() {
    return this.teams;
  }

  setTeams(teams: Team[]) {
    this.teams = teams;
  }
}
