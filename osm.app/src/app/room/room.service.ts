import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Room } from './room';

@Injectable()
export class RoomService {

  private roomUrl = 'http://localhost:64874/api/rooms';
  private joinRoomUrl = 'http://localhost:64874/api/joinroom';
  private headers = new Headers({ 
    'Access-Control-Allow-Origin': 'http://localhost:64874',
    'Content-Type': 'application/json;'
  });
  private requestOptions = new RequestOptions({ headers: this.headers});

  constructor(private http: Http) { }

  createRoom(memberId: number, room: Room): Observable<any> {
    return this.http
      .post(`${this.roomUrl}/${memberId}`, JSON.stringify(room), this.requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  joinRoom(memberId: number, room: Room): Observable<any> {
    return this.http
      .post(`${this.joinRoomUrl}/${memberId}`, JSON.stringify(room), this.requestOptions)
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