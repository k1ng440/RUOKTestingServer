import { Injectable } from '@angular/core';
import { Globals } from "../globals";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  id = localStorage.getItem('_id');

  constructor(
    private http: Http,
    private globals: Globals
  ) { }

  getProfile() {
    return this.http.get(environment.apiBase + 'user'+ '/' + this.id, this.jwt())
      .map((response: Response) => response.json());
  }

  createUser(data: any) {
    return this.http.post( environment.apiBase + 'createUser', data ).map((response: Response) => response.json());

 }

  updateProfile(data: any) {
    return this.http.put(environment.apiBase + 'user'+ '/' + this.id, data, this.jwt())
      .map((response: Response) => response.json());
  }

  private jwt() {
    let token = localStorage.getItem('token');
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('x-access-token',token);
    return new RequestOptions({ headers: headers });
  }
}
