import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NBAService {

  constructor(private http:HttpClient) { }

  getTeam(){
    return this.http.get(`${environment.baseUrl}/teams`);
  }
  getGames(){
    return this.http.get(`${environment.baseUrl}/games?page=0&dates[]=2022-12-06&dates[]=2022-12-05&dates[]=2022-12-04&per_page=12&team_ids[]=26
    `);
  }
}
