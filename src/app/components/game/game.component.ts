import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GameDataService } from 'src/app/service/game-data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @Input() game?: Game;
  @Input() index?: number;

  constructor(private gameDataService: GameDataService) {}

  ngOnInit(): void {}

  deleteTeamGames() {
    if (this.index !== undefined) this.gameDataService.deleteGame(this.index);
  }
}
