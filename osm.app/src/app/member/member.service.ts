import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { OsmMember } from './osm-member';

@Injectable()
export class MemberService {

  private memberUrl = 'http://localhost:64874/api/members';  // URL to web API
  private headers = new Headers({ 
    'Access-Control-Allow-Origin': 'http://localhost:64874',
    'Content-Type': 'application/json;'
  });
  private requestOptions = new RequestOptions({ headers: this.headers});

  constructor(private http: Http) { }

  addMember(member: OsmMember): Observable<any> {
    let headers = this.headers;
    return this.http.post(this.memberUrl, JSON.stringify(member), this.requestOptions)
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