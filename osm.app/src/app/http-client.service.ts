import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from "environments/environment";

@Injectable()
export class HttpClientService {
  private headers = new Headers({ 
    'Access-Control-Allow-Origin': `${environment.baseUrl}`,
    'Content-Type': 'application/json;'
  });
  private requestOptions = new RequestOptions({ headers: this.headers});

  constructor(private http: Http) { }

  get(url: string): Observable<Response> {
    return this.http.get(url, this.requestOptions);
  }

  post(url: string, data: any): Observable<Response> {
    return this.http.post(url, data, this.requestOptions);
  }

  put(url: string, data: any): Observable<Response> {
    return this.http.put(url, data, this.requestOptions);
  }

  delete(url: string): Observable<Response> {
    return this.http.delete(url, this.requestOptions);
  }

}
