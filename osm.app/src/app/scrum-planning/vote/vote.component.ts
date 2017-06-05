import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/do';

import { Card } from "../card";
import { ScrumPlanningService } from '../scrum-planning.service';
import { OsmMember } from "app/member/osm-member";
import { Room } from "app/room/room";

@Component({
  selector: 'osm-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {
  @Input() memberId: number;
  @Input() memberName: string;
  @Input() roomName: string;

  room: Room;
  cardValue: string;
  cards: Array<Card>;
  modalResult: NgbModalRef;

  constructor(private modalService: NgbModal,
    private service: ScrumPlanningService,
    private sanitizer: DomSanitizer) {
    this.cardValue = 'Vote';
  }

  ngOnInit() {
    this.service.getRoom(this.roomName).subscribe((result: Room) => {
      this.room = result;

      // get our data immediately when the component inits
      this.service.getCards(this.room.roomName)
        .first() // only gets fired once
        .subscribe((result: Array<Card>) => {
          this.cards = result;
        });
    });
  }

  open(content) {
    this.modalResult = this.modalService.open(content);
    this.modalResult.result.then((result) => { }, (reason) => { })
  }

  getSafeHtml(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

  vote(cardId: number) {
    let member: OsmMember = {
      id: this.memberId,
      name: this.memberName,
      roomId: this.room.id,
      cardId: cardId
    }
    this.service.vote(this.room.roomName, member).subscribe((result: boolean) => {
      this.modalResult.close();
    });
  }
}
