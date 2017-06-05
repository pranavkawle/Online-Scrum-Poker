import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { OsmMember } from "app/member/osm-member";
import { Room } from "app/room/room";
import { Card } from "app/scrum-planning/card";

@Injectable()
export class ScrumPlanningService {

  private memberUrl = 'http://localhost:64874/api/members';
  private joinRoomUrl = 'http://localhost:64874/api/joinroom';
  private roomUrl = 'http://localhost:64874/api/rooms';
  private cardsUrl = 'http://localhost:64874/api/cards';

  private headers = new Headers({ 
    'Access-Control-Allow-Origin': 'http://localhost:64874',
    'Content-Type': 'application/json;'
  });
  private requestOptions = new RequestOptions({ headers: this.headers});

  constructor(private http: Http) { }

  getMembers(roomName: string): Observable<OsmMember[]> {
    return this.http.get(`${this.joinRoomUrl}/${roomName}`, this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getRoom(roomName: string): Observable<Room> {
    return this.http.get(`${this.roomUrl}/${roomName}`, this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCards(roomName: string): Observable<Card[]> {
    return this.http.get(`${this.cardsUrl}/${roomName}`, this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  vote(roomName: string, member: OsmMember): Observable<boolean> {
    return this.http.put(`${this.memberUrl}/${roomName}`, JSON.stringify(member), this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}