import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Room } from './room';
import { HttpClientService } from "app/http-client.service";
import { environment } from "environments/environment";

@Injectable()
export class RoomService {

  private roomUrl = `${environment.baseUrl}/api/rooms`;
  private joinRoomUrl = `${environment.baseUrl}/api/joinroom`;

  constructor(private http: HttpClientService) { }

  createRoom(memberId: number, room: Room): Observable<any> {
    return this.http
      .post(`${this.roomUrl}/${memberId}`, JSON.stringify(room))
      .map(this.extractData)
      .catch(this.handleError);
  }

  joinRoom(memberId: number, room: Room): Observable<any> {
    return this.http
      .post(`${this.joinRoomUrl}/${memberId}`, JSON.stringify(room))
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData<T>(res: Response): T {
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