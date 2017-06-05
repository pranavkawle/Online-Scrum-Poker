import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby/lobby.component';
import { ScrumPlanningRoutingModule } from './scrum-planning-routing.module';
import { ScrumPlanningService } from './scrum-planning.service';
import { VoteComponent } from './vote/vote.component';

@NgModule({
  imports: [
    CommonModule,
    ScrumPlanningRoutingModule
  ],
  declarations: [LobbyComponent, VoteComponent],
  providers: [ScrumPlanningService]
})
export class ScrumPlanningModule { }
