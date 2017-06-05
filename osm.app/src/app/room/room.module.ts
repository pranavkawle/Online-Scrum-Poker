import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RoomRoutingModule } from './room-routing.module';
import { CreateRoomComponent } from './create-room/create-room.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { RoomService } from './room.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RoomRoutingModule
  ],
  declarations: [JoinRoomComponent, CreateRoomComponent],
  providers: [RoomService]
})
export class RoomModule { }
