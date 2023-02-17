import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { ResponseGameApi } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  private _games: Array<Game> = [];

  constructor() {
    const data = localStorage.getItem('games');
    if (data !== null) {
      this._games = JSON.parse(data);
    }
  }

  getAllGames() {
    return this._games;
  }

  loadGames(response: ResponseGameApi, teamId: number) {
    const gameFound = this._games.find((g) => g.idTeam == teamId);
    if (gameFound == undefined) {
      let game: Game = {};
      game.idTeam = teamId;
      game.avgScore = this.getAvregeScore(response, teamId);
      game.cancededScore = this.getCancededScore(response, teamId);
      if (response.data[0].home_team.id == teamId) {
        game.abbreviation = response.data[0].home_team.abbreviation;
        game.full_name = response.data[0].home_team.full_name;
        game.conference = response.data[0].home_team.conference;
        game.avatar = `https://interstate21.com/nba-logos/${response.data[0].home_team.abbreviation}.png`;
        game.scores = response.data.map((game) => {
          if (game.home_team_score > game.visitor_team_score) {
            return 'W';
          } else {
            return 'L';
          }
        });
      } else {
        game.abbreviation = response.data[0].visitor_team.abbreviation;
        game.full_name = response.data[0].visitor_team.abbreviation;
        game.conference = response.data[0].visitor_team.conference;
        game.avatar = `https://interstate21.com/nba-logos/${response.data[0].visitor_team.abbreviation}.png`;
        game.scores = response.data.map((game) => {
          if (game.visitor_team_score > game.home_team_score) {
            return 'W';
          } else {
            return 'L';
          }
        });
      }
      this._games.push(game);
      localStorage.setItem('games', JSON.stringify(this._games));
    } else {
      alert('Team already exist.');
    }
  }

  deleteGame(i: number) {
    this._games.splice(i, 1);
    localStorage.setItem('games', JSON.stringify(this._games));
  }

  getAvregeScore(response: ResponseGameApi, idTeam: number): number {
    const score = response.data
      .map((game) => {
        if (game.home_team.id == idTeam) {
          return game.home_team_score;
        } else {
          return game.visitor_team_score;
        }
      })
      .reduce((a, b) => {
        return a + b;
      }, 0);
    const total = response.data.length;
    return Math.trunc(score / total);
    return 0;
  }

  getCancededScore(response: ResponseGameApi, idTeam: number): number {
    const score = response.data
      .map((game) => {
        if (game.home_team.id == idTeam) {
          return game.visitor_team_score;
        } else {
          return game.home_team_score;
        }
      })
      .reduce((a, b) => {
        return a + b;
      }, 0);
    const total = response.data.length;
    return Math.trunc(score / total);
    return 0;
  }
}
