import {Component, OnInit} from '@angular/core';
import {CelebrityService} from '../celebrity.service';
import {CelebrityDetails} from './celebrity-details';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'celebrity-details',
    templateUrl: './celebrity-details.component.html',
    providers: [CelebrityService]
})

export class CelebrityDetailsComponent implements OnInit {
    
    constructor(private celebrityService: CelebrityService, private activateRoute: ActivatedRoute){
        this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
    }
 
    id: number;
    private subscription: Subscription;
    celebrityDetails: CelebrityDetails;
    
    ngOnInit() {
        this.getCelebrityById();
    }

    private getCelebrityById(){
        this.celebrityService.getCelebrity(this.id).subscribe((data: CelebrityDetails) => {
            this.celebrityDetails = data;})
    }
}