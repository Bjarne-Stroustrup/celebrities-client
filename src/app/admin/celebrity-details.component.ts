import {Component, OnInit} from '@angular/core';
import {CelebrityService} from '../celebrity.service';
import {CelebrityDetails} from './celebrity-details';
import {ActivatedRoute} from '@angular/router';
import {Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
    selector: 'celebrity-details',
    templateUrl: './celebrity-details.component.html',
    providers: [CelebrityService]
})

export class CelebrityDetailsComponent implements OnInit {
    
    constructor(private celebrityService: CelebrityService,
        private formBuilder: FormBuilder,
        private activateRoute: ActivatedRoute){
        this.subscription = activateRoute.params.subscribe(params=>this.id=params['id']);
    }
 
    id: number;
    celebrityDetails: CelebrityDetails;
    celebrityForm: FormGroup;
    private subscription: Subscription;
    
    ngOnInit() {
        this.getCelebrityById()
    }

    private getCelebrityById(){
        this.celebrityService.getCelebrity(this.id).subscribe((data: CelebrityDetails) => {
            this.celebrityDetails = data;
            this.createForm();
        })
    }

    private createForm(){
        this.celebrityForm = this.formBuilder.group({
             
            "celebrityName": [this.celebrityDetails.name, [Validators.required]],
            "celebrityInfo": [this.celebrityDetails.info],
            "celebrityAvatar": [this.celebrityDetails.avatarImage, [Validators.required]]
        });
    }

    isControlValid(controlName: string) : boolean{
        const control = this.celebrityForm.controls[controlName];
        return control.valid && control.touched;
    }

    submit(){
    }
}