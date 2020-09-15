import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CelebrityService} from '../celebrity.service';
import {CelebrityDetails} from './celebrity-details';
import { uniqueCelebrityNameValidator } from '../validators/uniqueCelebrityNameValidator';
import { allowedFileTypeValidator } from '../validators/allowedFileTypeValidator';
import { maxFileSizeValidator } from '../validators/maxFileSizeValidator';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'celebrity-details',
    templateUrl: './celebrity-details.component.html',
    providers: [CelebrityService]
})

export class CelebrityDetailsComponent implements OnInit {
    
    constructor(private celebrityService: CelebrityService,
        private formBuilder: FormBuilder,
        private activateRoute: ActivatedRoute){
        activateRoute.params.subscribe(params=>this.id=params['id']);
    }

    @ViewChild('readonlyTemplate', {static: false}) readonlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

    isEditMode: boolean = false;
    id: number;
    celebrityDetails: CelebrityDetails;
    celebrityForm: FormGroup;
    allowedImageTypes: Array<string> = ["jpeg", "jpg", "ico", "png", "bmp", "gif", "tif", "tiff", "webp"];
    maxImageSize: number = 5242880;
    
    ngOnInit() {
        this.getCelebrityById();
    }

    onEdit(){
        this.isEditMode=true;
        this.celebrityForm.patchValue({celebrityName: this.celebrityDetails.name,
            celebrityInfo: this.celebrityDetails.info});
        this.loadTemplate();
    }

    onCancel(){
        this.isEditMode=false;
        this.loadTemplate();
    }

    submit(){
        this.isEditMode = false;
        this.loadTemplate();
    }

    private getCelebrityById(){
        this.celebrityService.getCelebrity(this.id).subscribe((resp) => {
            this.celebrityDetails = resp.body;
            this.createForm();
        })
    }

    private createForm(){
        this.celebrityForm = this.formBuilder.group({      
            "celebrityName": [null, [Validators.required], [uniqueCelebrityNameValidator(this.celebrityDetails.name, this.celebrityService)], {updateOn: 'blur'}],
            "celebrityInfo": [null],
            "celebrityAvatar": [null, [allowedFileTypeValidator(this.allowedImageTypes), maxFileSizeValidator(this.maxImageSize)]]});
    }

    private loadTemplate(){
        if (this.isEditMode){
            return this.editTemplate;
        }

        return this.readonlyTemplate;
    }
}