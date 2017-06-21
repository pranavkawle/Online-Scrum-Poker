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
  enableRevealButton: boolean;
  currentCardId: number;

  room: Room;
  memberColors: { [key: number]: string }[];

  constructor(private router: Router, private route: ActivatedRoute, private service: ScrumPlanningService, public sanitizer: DomSanitizer) {
    this.memberColors = [];
    this.alive = true;
    this.cardsLoaded = false;

    this.room = new Room();
    this.room.ownerId = 0;
    this.room.isRevealed = false;
    this.enableRevealButton = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.roomName = params['roomName'];
      this.memberId = <number>params['memberId'];

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
                if (member) {
                  member.cardId = newMember.cardId;
                  if (member.cardId > 0 && !this.room.isRevealed) this.enableRevealButton = true;
                }
                else newMembers.push(newMember);
              });

              ///this.members.push(...newMembers);
              newMembers.forEach(newMember => {
                this.members.push(newMember);
                this.memberColors[newMember.id] = this.getRandomColor();
              });

              this.members = this.members.filter(m => members.find(m1 => m1.id === m.id));
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
    this.logout();
  }

  getCardValue(cardId: number) {
    if (this.cards && cardId > 0) {
      if (this.room && !this.room.isRevealed) 
        return this.sanitizer.bypassSecurityTrustHtml('<svg version="1.1" width="96" height="96" viewBox="0 0 10 16" class="octicon octicon-verified" aria-hidden="true"><use xlink:href="#verified" /></svg>');
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
      this.currentCardId = 0;
      this.enableRevealButton = false;
    });
  }

  revealVotes() {
    this.room.isRevealed = true;
    this.service.updateRoom(this.room).subscribe((result: boolean) => {
      this.enableRevealButton = false;
    });
  }

  logout() {
    if (Number(this.memberId) === Number(this.room.ownerId)) {
      this.service.leaveRoom(this.room.id).subscribe((result: boolean) => {
        this.router.navigate(['/login']);
      });
    }
    else {
      this.service.logout(this.memberId).subscribe((result: boolean) => {
        this.router.navigate(['/login']);
      });
    }
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
