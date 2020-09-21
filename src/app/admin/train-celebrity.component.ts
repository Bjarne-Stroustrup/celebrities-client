import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CelebrityService} from '../celebrity.service';
import { Celebrity } from './celebrity';
import { allowedFileTypeValidator } from '../validators/allowedFileTypeValidator';
import { maxFileSizeValidator } from '../validators/maxFileSizeValidator';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'train-celebrity',
    templateUrl: './train-celebrity.component.html',
    providers: [CelebrityService]
})

export class TrainCelebrityComponent implements OnInit {
    
    constructor(private celebrityService: CelebrityService,
        private formBuilder: FormBuilder,
        private activateRoute: ActivatedRoute){
        activateRoute.params.subscribe(params => this.id = params['id']);
    }

    id: number;
    celebrity: Celebrity;
    faceExamplesCount: number;
    trainCelebrityForm: FormGroup;
    allowedImageTypes: Array<string> = ["jpeg", "jpg", "ico", "png", "bmp", "gif", "tif", "tiff", "webp"];
    maxImageSize: number = 5242880;

    ngOnInit() {
        this.getCelebrity();
        this.getCelebrityExampleCount();
        this.createForm();
    }

    submit(){
        const formData = new FormData();
        const image = this.trainCelebrityForm.get('celebrityImage').value
        formData.append('image', image, image.name);

        this.celebrityService.addFaceExample(this.id, formData).subscribe((resp) => {
            if(resp.status === 200){
                this.celebrity.trained == true;
                ++this.faceExamplesCount;
            }
        });
    }

    private getCelebrityExampleCount(){
        this.celebrityService.getCelebrityExampleCount(this.id).subscribe((resp) => {
            if(resp.status === 200){
                this.faceExamplesCount = resp.body; 
            }
        })
    }

    private getCelebrity(){
        this.celebrityService.getCelebrity(this.id).subscribe((resp) => {
            this.celebrity = resp.body;
        })
    }

    private createForm(){
        this.trainCelebrityForm = this.formBuilder.group({      
            "celebrityImage": [null, [allowedFileTypeValidator(this.allowedImageTypes), maxFileSizeValidator(this.maxImageSize)]]});
    }
}