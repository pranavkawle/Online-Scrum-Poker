import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/distinctUntilChanged';

import { Room } from "../../room/room";
import { OsmMember } from "../../member/osm-member";
import { ScrumPlanningService } from '../scrum-planning.service';
import { Card } from "app/scrum-planning/card";
import { Refresh } from "app/scrum-planning/refresh";

@Component({
  selector: 'osm-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit, OnDestroy {
  roomName: string;
  memberId: number;
  memberName: string;

  members: Array<OsmMember>;
  cards: Array<Card>;
  private alive: boolean; // used to unsubscribe from the IntervalObservable when OnDestroy is called.
  private cardsLoaded: boolean;
  currentCardId: number;

  room: Room;
  memberColors: { [key: number]: string }[];

  constructor(private router: Router, private route: ActivatedRoute, private service: ScrumPlanningService, private sanitizer: DomSanitizer) {
    this.memberColors = [];
    this.alive = true;
    this.cardsLoaded = false;

    this.room = new Room();
    this.room.ownerId = 0;
    this.room.isRevealed = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.roomName = params['roomName'];
      this.memberId = params['memberId'];

      // get our data immediately when the component inits
      this.getMembersOnce();

      // get our data every subsequent 10 seconds
      IntervalObservable.create(5000)
        .takeWhile(() => this.alive) // only fires when component is alive
        .distinctUntilChanged()
        .subscribe(() => {
          this.service.refresh(this.roomName)
            .subscribe((result: Refresh) => {
              if (!result) this.router.navigate(['/login']);

              let members = result.members;
              this.room.isRevealed = result.isRevealed;

              let newMembers: OsmMember[] = [];
              members.forEach(newMember => {
                let member = this.members.find(m => m.id === newMember.id);
                if (member) member.cardId = newMember.cardId;
                else newMembers.push(newMember);
              });

              ///this.members.push(...newMembers);
              newMembers.forEach(newMember => {
                this.members.push(newMember);
                this.memberColors[newMember.id] = this.getRandomColor();
              });
            });
        });

      this.service.getRoom(this.roomName).subscribe((result: Room) => {
        this.room = result;
      });

      // get our data immediately when the component inits
      this.service.getCards(this.roomName)
        .first() // only gets fired once
        .subscribe((result: Array<Card>) => {
          this.cards = result;
          this.cardsLoaded = true;
        });
      this.waitForCards();
    });
  }

  ngOnDestroy() {
    this.alive = false; // switches your IntervalObservable off
  }

  getCardValue(cardId: number) {
    if (this.cards && cardId > 0) {
      if(this.room && !this.room.isRevealed) return '';
      return this.sanitizer.bypassSecurityTrustHtml(this.cards.find(c => c.id === cardId).value);
    }
    else
      return '';
  }

  getMembersOnce() {
    this.service.refresh(this.roomName)
      .first() // only gets fired once
      .subscribe((result: Refresh) => {
        if (!result) this.router.navigate(['/login']);

        this.members = result.members;
        this.members.forEach(member => {
          if (member && member.id > 0) {
            this.memberColors[member.id] = this.getRandomColor();
            if (member.id === this.memberId) {
              this.memberName = member.name;
              this.currentCardId = member.cardId;
            }
          }
        });
      });
  }

  resetVotes() {
    this.room.isRevealed = false;
    this.service.updateRoom(this.room).subscribe((result: boolean) => {
      console.log('reset');
      this.currentCardId = 0;
    });
  }

  revealVotes() {
    this.room.isRevealed = true;
    this.service.updateRoom(this.room).subscribe((result: boolean) => {
      console.log('reveal');
    });
  }

  private waitForCards() {
    setTimeout(() => {
      if (!this.cardsLoaded) this.waitForCards();
    }, 1000);
  }

  private getRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}
