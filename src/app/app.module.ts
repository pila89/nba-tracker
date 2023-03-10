import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListTeamsComponent } from './components/list-teams/list-teams.component';
import { Page404Component } from './components/page404/page404.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ScoresTeamComponent } from './components/scores-team/scores-team.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameComponent } from './components/game/game.component';
import { ListGameComponent } from './components/list-game/list-game.component';

@NgModule({
  declarations: [
    AppComponent,
    ListTeamsComponent,
    Page404Component,
    ScoresTeamComponent,
    GameComponent,
    ListGameComponent,
  ],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule,ReactiveFormsModule,FormsModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
