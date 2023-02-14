import { Component, OnInit, ViewChild } from '@angular/core';
import { NBAService } from '../http/nba.service';
import { Games } from '../models/games';
import { ResponseGameApi, ResponseTeamApi } from '../models/response';
import { Team } from '../models/teams';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private nbaService: NBAService) {}

  ngOnInit(): void {
    this.createTeamForm();
    this.loadTeams();
  }

  createTeamForm() {
    this.teamForm = new FormGroup({
      teamId: new FormControl('', Validators.required),
    });
  }

  loadTeams() {
    this.nbaService.getTeam().subscribe(
      (response: ResponseTeamApi) => {
        this.teams = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getGames() {
    this.submitted = true;
    if (this.teamForm.invalid) {
      return;
    }
    this.nbaService.getGamesByIdTeam(this.teamForm.value.teamId).subscribe(
      (response) => {
        response.idTeam=this.teamForm.value.teamId;
        this.gameResponses.push(response);
        // this.teamForm.reset();
        this.submitted = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteTeam(i: number) {
    this.gameResponses.splice(i, 1);
  }

  getAvregeScore(i: number): number {
    const score = this.gameResponses[i].data
      .map((game) => game.home_team_score)
      .reduce((a, b) => {
        return a + b;
      }, 0);
    const total = this.gameResponses[i].data.length;
    return Math.round(score / total);
  }

  getCancededScore(i: number): number {
    const score = this.gameResponses[i].data
      .map((game) => game.visitor_team_score)
      .reduce((a, b) => {
        return a + b;
      }, 0);
    const total = this.gameResponses[i].data.length;
    return Math.round(score / total);
  }
}
