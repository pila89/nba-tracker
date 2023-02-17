import { Component, OnInit } from '@angular/core';
import { NBAService } from '../../http/nba.service';
import { Team } from '../../models/teams';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameDataService } from 'src/app/service/game-data.service';
import { TeamDataService } from 'src/app/service/team-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-teams',
  templateUrl: './list-teams.component.html',
  styleUrls: ['./list-teams.component.scss'],
})
export class ListTeamsComponent implements OnInit {
  teams?: Observable<Team[] | null>;
  teamForm!: FormGroup;
  submitted = false;

  constructor(
    private nbaService: NBAService,
    private teamDataService: TeamDataService,
    private gameDataService: GameDataService
  ) {}

  ngOnInit(): void {
    this.createTeamForm();
    this.teams = this.teamDataService.teams;
  }

  createTeamForm() {
    this.teamForm = new FormGroup({
      teamId: new FormControl('', Validators.required),
    });
  }

  getGames() {
    this.submitted = true;
    if (this.teamForm.invalid) {
      return;
    }
    this.nbaService.getGamesByIdTeam(this.teamForm.value.teamId).subscribe(
      (response) => {
        this.gameDataService.loadGames(response, this.teamForm.value.teamId);
        // this.teamForm.reset();
        this.submitted = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
