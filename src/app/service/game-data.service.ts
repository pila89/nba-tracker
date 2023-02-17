import { Injectable } from '@angular/core';
import { ResponseGameApi } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  private _games: Array<ResponseGameApi> = [];

  constructor() {
    const data = localStorage.getItem('games');
    if (data !== null) {
      this._games = JSON.parse(data);
    }
  }

  getAllGames() {
    return this._games;
  }

  addGame(game: ResponseGameApi) {
    this._games.push(game);
    localStorage.setItem('games', JSON.stringify(this._games));
  }

  deleteGame(i: number) {
    this._games.splice(i, 1);
    localStorage.setItem('games', JSON.stringify(this._games));
  }


}
