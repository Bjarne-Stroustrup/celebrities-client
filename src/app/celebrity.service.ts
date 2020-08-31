import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
    
@Injectable()
export class CelebrityService{
    
    private endpoint = "https://localhost:5001/api";
    constructor(private httpCleint: HttpClient){ }
       
    getCelebrities(){
        return this.httpCleint.get(`${this.endpoint}/admin`);
    }

    getCelebrity(id: number){
        return this.httpCleint.get(`${this.endpoint}/admin/${id}`);
    }
}