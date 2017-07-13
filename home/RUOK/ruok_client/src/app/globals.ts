//export const Globals = "http://172.16.16.152:8081/api/";
import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
	apiBase:any;
    constructor() {
   this.apiBase = "http://127.0.0.1:8081/api/";
    }

}
