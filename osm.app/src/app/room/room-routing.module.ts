import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CreateRoomComponent } from './create-room/create-room.component';
import { JoinRoomComponent } from './join-room/join-room.component';

const routes: Routes = [
  { path: 'create-room/:memberId', component: CreateRoomComponent },
  { path: 'join-room/:memberId', component: JoinRoomComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RoomRoutingModule { }

