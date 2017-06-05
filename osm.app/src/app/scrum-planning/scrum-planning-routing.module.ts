import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LobbyComponent } from './lobby/lobby.component';
import { VoteComponent } from './vote/vote.component';

const routes: Routes = [
  { path: 'lobby/:roomName/:memberId', component: LobbyComponent },
  { path: 'vote/:roomName/:roomId/:memberName/:memberId', component: VoteComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ScrumPlanningRoutingModule { }
