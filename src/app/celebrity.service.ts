import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GridCelebrity } from './admin/grid-celebrity';
import { Celebrity } from './admin/celebrity';
import { SimilarCelebrity } from './user/similar-celebrity';
    
@Injectable()
export class CelebrityService{
    
    private userEndpoint = "https://localhost:5001/api/user";
    private adminEndpoint = "https://localhost:5001/api/admin";
    constructor(private httpCleint: HttpClient){ }
       
    getCelebrities(){
        return this.httpCleint.get<Array<GridCelebrity>>(`${this.adminEndpoint}`, { observe: 'response' });
    }

    getCelebrity(id: number){
        return this.httpCleint.get<Celebrity>(`${this.adminEndpoint}/${id}`, { observe: 'response' });
    }

    addCelebrity(formData: FormData){
        return this.httpCleint.post<Celebrity>(`${this.adminEndpoint}`, formData, { observe: 'response' });
    }

    deleteCelebrity(id: number){
        return this.httpCleint.delete(`${this.adminEndpoint}/${id}`, { observe: 'response' });
    }

    updateCelebrity(id: number, formData: FormData){
        return this.httpCleint.put<Celebrity>(`${this.adminEndpoint}/${id}`, formData, { headers: {'Content-Type': 'multipart/form-data'} });
    }

    recognizeFace(formData: FormData){
        return this.httpCleint.post<Array<SimilarCelebrity>>(`${this.userEndpoint}`, formData, { observe: 'response' });
    }

    doesCelebrityNameExist(celebrityName: string){
        let params = new HttpParams().set('celebrityName', celebrityName);
        return this.httpCleint.get<boolean>(`${this.adminEndpoint}/validation/doesCelebrityNameExist`, { params: params });
    }
}