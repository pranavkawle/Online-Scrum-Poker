import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JoinRoomComponent } from './join-room/join-room.component';
import { JoinRoomService } from './join-room/join-room.service';
import { RoomRoutingModule } from './room-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoomRoutingModule
  ],
  declarations: [JoinRoomComponent],
  providers: [JoinRoomService]
})
export class RoomModule { }
