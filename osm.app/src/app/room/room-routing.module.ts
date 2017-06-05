import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { JoinRoomComponent } from './join-room/join-room.component';
import { OsmMember } from '../member/osm-member';

const routes: Routes = [
  { path: 'join-room', component: JoinRoomComponent, data: { member: OsmMember } },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RoomRoutingModule { }

