import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { OsmMember } from "app/member/osm-member";
import { Room } from "app/room/room";
import { Card } from "app/scrum-planning/card";
import { Refresh } from "app/scrum-planning/refresh";
import { environment } from "environments/environment";
import { HttpClientService } from "app/http-client.service";

@Injectable()
export class ScrumPlanningService {

  private memberUrl = `${environment.baseUrl}/api/members`;
  private refreshUrl = `${environment.baseUrl}/api/refresh`;
  private roomUrl = `${environment.baseUrl}/api/rooms`;
  private cardsUrl = `${environment.baseUrl}/api/cards`;

  constructor(private http: HttpClientService) { }

  refresh(roomName: string): Observable<Refresh> {
    return this.http.get(`${this.refreshUrl}/${roomName}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getRoom(roomName: string): Observable<Room> {
    return this.http.get(`${this.roomUrl}/${roomName}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getCards(roomName: string): Observable<Card[]> {
    return this.http.get(`${this.cardsUrl}/${roomName}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  vote(roomName: string, member: OsmMember): Observable<boolean> {
    return this.http.put(`${this.memberUrl}/${roomName}`, JSON.stringify(member))
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateRoom(room: Room): Observable<boolean> {
    return this.http.put(`${this.roomUrl}/${room.id}`, JSON.stringify(room))
      .map(this.extractData)
      .catch(this.handleError);
  }

  leaveRoom(roomId: number): Observable<boolean> {
    return this.http.delete(`${this.roomUrl}/${roomId}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  logout(memberId: number): Observable<boolean> {
    return this.http.delete(`${this.memberUrl}/${memberId}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    console.log(error);
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