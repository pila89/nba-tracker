import { Component, OnInit } from '@angular/core';
import { ResponseGameApi } from 'src/app/models/response';
import { NBADataService } from 'src/app/service/nba-data.service';

@Component({
  selector: 'app-list-game',
  templateUrl: './list-game.component.html',
  styleUrls: ['./list-game.component.scss'],
})
export class ListGameComponent implements OnInit {
  gameResponses: Array<ResponseGameApi> = [];

  constructor(private nbaData: NBADataService) {}

  ngOnInit(): void {
    this.loadGames();
  }
  loadGames() {
    this.gameResponses = this.nbaData.getAllGames();
  }

  deleteTeam(i: number) {
    this.nbaData.deleteGame(i);
  }

  getAvregeScore(i: number, idTeam: number | undefined): number {
    const score = this.gameResponses[i].data
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
    const total = this.gameResponses[i].data.length;
    return Math.trunc(score / total);
  }

  getCancededScore(i: number, idTeam: number | undefined): number {
    const score = this.gameResponses[i].data
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
    const total = this.gameResponses[i].data.length;
    return Math.trunc(score / total);
  }
}
