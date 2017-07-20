import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Globals } from '../globals';

@Injectable()
export class PatientService {
    id = localStorage.getItem('_id');
    constructor(private http: Http, private globals:Globals) { }

    addNewPatient(data: any) {
        return this.http.post( this.globals.apiBase + 'addNewPatient'+ '/' + this.id, data ,this.jwt() ).map((response: Response) => response.json());
    }

    getPending() {
        return this.http.get( this.globals.apiBase + 'getPending'+ '/' + this.id, this.jwt() ).map((response: Response) => response.json());
    }

    getCompleted() {
        return this.http.get( this.globals.apiBase + 'getCompleted'+ '/' + this.id, this.jwt() ).map((response: Response) => response.json());
    }

    getUserProfile() {
        return this.http.get( this.globals.apiBase + 'getUserProfile'+ '/' + this.id, this.jwt() ).map((response: Response) => response.json());
    }

    patientResponse(data: any) {
        return this.http.post( this.globals.apiBase + 'patientResponse', data ).map((response: Response) => response.json());
    }

    contactProvider(data: any) {
        return this.http.post( this.globals.apiBase + 'contactProvider', data ).map((response: Response) => response.json());
    }

    private jwt() {
        let token = localStorage.getItem('token');
        let headers = new Headers({ 'Accept': 'application/json' });
        headers.append('x-access-token',token);
        return new RequestOptions({ headers: headers });
    }
}
