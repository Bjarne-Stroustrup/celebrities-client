import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
    
@Injectable()
export class CelebrityService{
    
    private userEndpoint = "https://localhost:5001/api/user";
    private adminEndpoint = "https://localhost:5001/api/admin";
    constructor(private httpCleint: HttpClient){ }
       
    getCelebrities(){
        return this.httpCleint.get(`${this.adminEndpoint}`);
    }

    getCelebrity(id: number){
        return this.httpCleint.get(`${this.adminEndpoint}/${id}`);
    }

    recognizeFace(formData: FormData){
        return this.httpCleint.post(`${this.userEndpoint}`, formData);
    }
}