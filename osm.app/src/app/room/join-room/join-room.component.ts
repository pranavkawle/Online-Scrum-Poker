import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RoomService } from '../room.service';
import { Room } from '../room';
import { OsmMember } from '../../member/osm-member';

@Component({
  selector: 'osm-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent implements OnInit {
  roomForm: FormGroup;
  room: Room;
  memberId: number;
  invalidPassphrase: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private service: RoomService, private formBuilder: FormBuilder) {
    this.room = new Room();
    this.room.id = 0;
    this.room.roomName = '';
    this.room.passphrase = '';
    this.room.isOpen = true;
    this.invalidPassphrase = false;
  }

  ngOnInit() {
    this.buildForm();
    this.route.params.subscribe(params => {
      this.memberId = params['memberId'];
    });
  }

  joinRoom() {
    this.invalidPassphrase = false;
    this.prepareRoom();
    this.service.joinRoom(this.memberId, this.room).subscribe((result: any) => {
      if(result > 0) {
        this.room.id = result;
        this.router.navigate(['/lobby', this.room.roomName, this.memberId]);
      }
      else {
        this.invalidPassphrase = true;
      }
    });
  }

  private buildForm(): void {
    this.roomForm = this.formBuilder.group({
      'passphrase': [this.room.passphrase],
      'roomName': [this.room.roomName]
    });
  }

  private prepareRoom(): void {
    this.room.roomName = this.roomForm.controls.roomName.value;
    this.room.passphrase = this.roomForm.controls.passphrase.value;
  }

  formErrors = {
    'password': 'Invalid passphrase!'
  }
}
