import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Globals } from '../globals';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private globals:Globals) {
    }

    login(data: any) {
        return this.http.post( this.globals.apiBase + 'login', data )
            .map((response: Response) => response.json());

    }

    createUser(data: any) {
       return this.http.post( this.globals.apiBase + 'createUser', data ).map((response: Response) => response.json());

    }

    forgotPassword(data: any) {
        return this.http.post( this.globals.apiBase + 'forgotPassword', data )
            .map((response: Response) => response.json());

    }

    resetPassword(data: any,token:any) {
        return this.http.post( this.globals.apiBase + 'resetPassword/'+ token, data )
            .map((response: Response) => response.json());

    }
}
