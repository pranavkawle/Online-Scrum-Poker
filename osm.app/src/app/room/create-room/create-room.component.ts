import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { RoomService } from '../room.service';
import { Room } from '../room';

@Component({
  selector: 'osm-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {
  roomForm: FormGroup;
  room: Room;
  memberId: number;

  constructor(private router: Router, private route: ActivatedRoute, private service: RoomService, private formBuilder: FormBuilder) {
    this.room = new Room();
    this.room.id = 0;
    this.room.roomName = '';
    this.room.passphrase = '';
    this.room.maximumComplexity = 13 // Set default value for max complexity
  }

  ngOnInit() {
    this.buildForm();
    this.route.params.subscribe(params => {
      this.memberId = params['memberId'];
    });
  }

  createRoom() {
    this.prepareRoom();
    this.service.createRoom(this.memberId, this.room).subscribe((result: Room) => {
      this.room = result;
      this.router.navigate(['/lobby', this.room.roomName, this.memberId]);
    });
  }

  private buildForm(): void {
    this.roomForm = this.formBuilder.group({
      'passphrase': [this.room.passphrase],
      'maxComplexity': [this.room.maximumComplexity]
    });
  }

  private prepareRoom(): void {
    this.room.passphrase = this.roomForm.controls.passphrase.value;
    this.room.maximumComplexity = this.roomForm.controls.maxComplexity.value;
  }
}
