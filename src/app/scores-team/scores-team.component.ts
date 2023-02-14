import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseGameApi } from '../models/response';
import { NBAService } from '../http/nba.service';

@Component({
  selector: 'app-scores-team',
  templateUrl: './scores-team.component.html',
  styleUrls: ['./scores-team.component.scss'],
})
export class ScoresTeamComponent implements OnInit {
  teamId?: number;
  response?: ResponseGameApi;
  constructor(
    private activatedRoute: ActivatedRoute,
    private nbaService: NBAService
  ) {}

  ngOnInit(): void {
    this.teamId = this.activatedRoute.snapshot.params['teamCode'];
    this.getGames();
  }
  getGames() {
    if (this.teamId) {
      this.nbaService.getGamesByIdTeam(this.teamId?.toString()).subscribe(
        (response) => {
          this.response = response;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
