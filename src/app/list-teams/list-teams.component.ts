import { Component, OnInit } from '@angular/core';
import { NBAService } from '../http/nba.service';

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.component.html',
  styleUrls: ['./list-teams.component.scss'],
})
export class ListTeamsComponent implements OnInit {
  games: any = [];
  teams: any = [];
  constructor(private nbaService: NBAService) {}

  ngOnInit(): void {
    this.loadTeams();
  }
  loadTeams() {
    this.nbaService.getTeam().subscribe(
      (data: any) => {
        this.teams = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getGames() {
    this.nbaService.getGames().subscribe(
      (data) => {
        this.games.push(data)
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
