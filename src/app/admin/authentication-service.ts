import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, shareReplay } from 'rxjs/internal/operators';
import * as moment from 'moment';
    
@Injectable()
export class AuthenticationService{
    
    private endpoint = "https://localhost:5001/api/account";
    constructor(private httpCleint: HttpClient){ }
       
    getToken(login: string, password: string){
        let params = new HttpParams().set('login', login).set('password', password);
        return this.httpCleint.post(`${this.endpoint}/token`, params, { observe: 'response' }).
        pipe( tap(response => this.setSession), shareReplay());
    }
              
    private setSession(response) {
    const expiresAt = moment().add(response.lifetime, 'minute');
    
        localStorage.setItem('token', response.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }          
    
    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
    }