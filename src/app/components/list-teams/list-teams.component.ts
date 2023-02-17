import { Component, OnInit } from '@angular/core';
import { NBAService } from '../../http/nba.service';
import { ResponseTeamApi } from '../../models/response';
import { Team } from '../../models/teams';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamDataService } from 'src/app/service/team-data.service';
import { GameDataService } from 'src/app/service/game-data.service';

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.component.html',
  styleUrls: ['./list-teams.component.scss'],
})
export class ListTeamsComponent implements OnInit {
  teams?: Team[];
  teamForm!: FormGroup;
  submitted = false;

  constructor(
    private nbaService: NBAService,
    private teamDataService: TeamDataService,
    private gameDataService:GameDataService
  ) {}

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
    this.teams = this.teamDataService.getTeams();
    if (this.teams.length == 0) {
      this.nbaService.getTeam().subscribe(
        (response: ResponseTeamApi) => {
          this.teamDataService.setTeams(response.data);
          this.teams = this.teamDataService.getTeams();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  getGames() {
    this.submitted = true;
    if (this.teamForm.invalid) {
      return;
    }
    this.nbaService.getGamesByIdTeam(this.teamForm.value.teamId).subscribe(
      (response) => {
        response.idTeam = this.teamForm.value.teamId;
        this.gameDataService.addGame(response);
        // this.teamForm.reset();
        this.submitted = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
