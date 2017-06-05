import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'osm-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent implements OnInit {

  @Input() roomNumber: string;

  constructor() { }

  ngOnInit() {
  }

  joinRoom() {
    
  }

}
