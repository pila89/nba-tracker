import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GameDataService } from 'src/app/service/game-data.service';

@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.component.html',
  styleUrls: ['./list-game.component.scss'],
})
export class ListGameComponent implements OnInit {
  games: Array<Game> = [];

  constructor(private gameDataService: GameDataService) {}

  ngOnInit(): void {
    this.loadGames();
  }
  loadGames() {
    this.games = this.gameDataService.getAllGames();
  }


}
