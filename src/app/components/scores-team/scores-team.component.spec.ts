import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresTeamComponent } from './scores-team.component';

describe('ScoresTeamComponent', () => {
  let component: ScoresTeamComponent;
  let fixture: ComponentFixture<ScoresTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoresTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoresTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
