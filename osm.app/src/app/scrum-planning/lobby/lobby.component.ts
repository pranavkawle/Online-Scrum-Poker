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

  room: Room;
  memberColors: { [key: number]: string }[];

  constructor(private router: Router, private route: ActivatedRoute, private service: ScrumPlanningService, private sanitizer: DomSanitizer) {
    this.memberColors = [];
    this.alive = true;
    this.cardsLoaded = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.roomName = params['roomName'];
      this.memberId = params['memberId'];

      // get our data immediately when the component inits
      this.service.getMembers(this.roomName)
        .first() // only gets fired once
        .subscribe((result: Array<OsmMember>) => {
          this.members = result;
          this.members.forEach(member => {
            if (member && member.id > 0) {
              this.memberColors[member.id] = this.getRandomColor();
              if (member.id === this.memberId) this.memberName = member.name;
            }
          });
        });

      // get our data every subsequent 10 seconds
      IntervalObservable.create(5000)
        .takeWhile(() => this.alive) // only fires when component is alive
        .distinctUntilChanged()
        .subscribe(() => {
          this.service.getMembers(this.roomName)
            .subscribe((result: Array<OsmMember>) => {
              let newMembers: OsmMember[] = [];
              // result.forEach(newMember => {
              //   let found = false;
              //   this.members.forEach(member => {
              //     if (newMember.id == member.id) {
              //       found = true;
              //       member.cardId = newMember.cardId;
              //     }
              //   });
              //   if (!found) newMembers.push(newMember);
              // });

              result.forEach(newMember => {
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
    if (this.cards)
      return this.sanitizer.bypassSecurityTrustHtml(this.cards.find(c => c.id === cardId).value);
    else
      return '';
  }

  private waitForCards() {
    setTimeout(() => {
      if (!this.cardsLoaded) this.waitForCards();
    }, 2000);
  }

  private getRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}
