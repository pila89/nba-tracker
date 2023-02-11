import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { ListTeamsComponent } from './list-teams/list-teams.component';
import { ScoresTeamComponent } from './scores-team/scores-team.component';

const routes: Routes = [
  { path: '', component: ListTeamsComponent },
  { path: 'results/:teamCode', component: ScoresTeamComponent },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
