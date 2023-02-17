import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent implements OnInit {
  @Input() public teamAndGame: any;
  public avrageScore :number =0;
  constructor() {}

  ngOnInit(): void {
    // this.isVisitorOrHome(this.teamAndGame.teamInfos.id);

    this.avrageScore = this.getAverageScore(this.teamAndGame.gameInfos);

  }
  isVisitorOrHome(id: any,element:any) {
    let isVisitor: boolean;
    // const salim = this.teamAndGame.gameInfos[0];
    if (salim.home_team.id == id) {
      isVisitor = false;
    } else {
      isVisitor = true;
    }
    return isVisitor;
  }
  getAverageScore(data: any) {
    console.log('xxxxxxxxxxx', data);
    let somme = 0;
    data.forEach((element: any) => {
      const isVisitor = this.isVisitorOrHome(element);
      if (isVisitor == true) {
        somme = somme + element.visitor_team_score;
      } else {
        somme = somme + element.home_team_score;
      }
      // console.log(element);
    });
    return somme;
  }
}
