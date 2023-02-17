import { Component, OnInit } from '@angular/core';
import { NBAService } from '../../http/nba.service';
import { ResponseGameApi, ResponseTeamApi } from '../../models/response';
import { Team } from '../../models/teams';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NBADataService } from '../../service/nba-data.service';

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.component.html',
  styleUrls: ['./list-teams.component.scss'],
})
export class ListTeamsComponent implements OnInit {
  gameResponses: Array<ResponseGameApi> = [];
  teams?: Team[];
  teamForm!: FormGroup;
  submitted = false;

  constructor(
    private nbaService: NBAService,
    private nbaData: NBADataService
  ) {}

  ngOnInit(): void {
    this.createTeamForm();
    this.loadTeams();
    this.loadGames();
  }

  createTeamForm() {
    this.teamForm = new FormGroup({
      teamId: new FormControl('', Validators.required),
    });
  }

  loadTeams() {
    this.teams = this.nbaData.getTeams();
    if (this.teams.length == 0) {
      this.nbaService.getTeam().subscribe(
        (response: ResponseTeamApi) => {
          this.nbaData.setTeams(response.data);
          this.teams = this.nbaData.getTeams();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  loadGames() {
    this.gameResponses = this.nbaData.getAllGames();
  }

  getGames() {
    this.submitted = true;
    if (this.teamForm.invalid) {
      return;
    }
    this.nbaService.getGamesByIdTeam(this.teamForm.value.teamId).subscribe(
      (response) => {
        response.idTeam = this.teamForm.value.teamId;
        this.nbaData.addGame(response);
        // this.teamForm.reset();
        this.submitted = false;
      },
      (error) => {
        console.log(error);
      }
    );
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
