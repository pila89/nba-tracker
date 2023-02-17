import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseGameApi, ResponseTeamApi } from '../models/response';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class NBAService {
  postFix = '';
  constructor(private http: HttpClient) {
    const currentDate = moment();
    for (let i = 0; i < 12; i++) {
      currentDate.add(-1, 'day');
      this.postFix += `&dates[]=${currentDate.format('YYYY-MM-DD')}`;
    }
  }

  getTeams(): Observable<ResponseTeamApi> {
    return this.http.get<ResponseTeamApi>(`${environment.baseUrl}/teams`);
  }

  getGamesByIdTeam(id: number | string): Observable<ResponseGameApi> {
    return this.http
      .get<ResponseGameApi>(`${environment.baseUrl}/games?page=0${this.postFix}&per_page=12&team_ids[]=${id}
    `);
  }
  getTeamById(id: number | string): Observable<any> {
    return this.http.get<ResponseTeamApi>(`${environment.baseUrl}/teams/${id}`);
  }
}
