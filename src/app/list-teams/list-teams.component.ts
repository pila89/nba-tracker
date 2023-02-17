import { Component, OnInit } from '@angular/core';
import { NBAService } from '../http/nba.service';
import { ResponseGameApi, ResponseTeamApi } from '../models/response';
import { Team } from '../models/teams';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamCodeService } from '../service/team-code.service';

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.component.html',
  styleUrls: ['./list-teams.component.scss'],
})
export class ListTeamsComponent implements OnInit {
  gameResponses: Array<ResponseGameApi> = [];
  teams?: Array<Team>;
  teamForm!: FormGroup;
  public teamAndGames: any = [];
  submitted = false;

  constructor(
    private nbaService: NBAService,
    private teamCodeService: TeamCodeService
  ) {}

  ngOnInit(): void {
    this.createTeamForm();
    this.loadTeams();
    this.gameResponses = this.teamCodeService.getAllTeams();
  }

  createTeamForm() {
    this.teamForm = new FormGroup({
      teamId: new FormControl('', Validators.required),
    });
  }

  loadTeams() {
    this.nbaService.getTeams().subscribe(
      (response: ResponseTeamApi) => {
        this.teams = response.data;
        console.log();
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
    this.nbaService
      .getTeamById(this.teamForm.value.teamId)
      .subscribe((data) => {
        this.nbaService
          .getGamesByIdTeam(this.teamForm.value.teamId)
          .subscribe((response: any) => {
            console.log('getGamesByIdTeam', data);
            this.teamAndGames.push({
              teamInfos: data,
              gameInfos: response.data,
              
            });
          });
      });

    // this.nbaService.getGamesByIdTeam(this.teamForm.value.teamId).subscribe(
    //   (response) => {
    //     response.idTeam = this.teamForm.value.teamId;
    //     console.log(this.gameResponses);

    //     this.teamCodeService.addTeamCode(response);

    //     // this.teamForm.reset();
    //     this.submitted = false;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  deleteTeam(i: number) {
    this.gameResponses.splice(i, 1);
    // this.teamCodeService.deleteTeamCode(this.teamForm.value.teamId);
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
