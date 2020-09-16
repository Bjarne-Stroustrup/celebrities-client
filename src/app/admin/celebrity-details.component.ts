import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CelebrityService} from '../celebrity.service';
import { Celebrity } from './celebrity';
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
    celebrity: Celebrity;
    celebrityForm: FormGroup;
    allowedImageTypes: Array<string> = ["jpeg", "jpg", "ico", "png", "bmp", "gif", "tif", "tiff", "webp"];
    maxImageSize: number = 5242880;
    
    ngOnInit() {
        this.getCelebrityById();
    }

    onEdit(){
        this.isEditMode=true;
        this.celebrityForm.patchValue({celebrityName: this.celebrity.name,
            celebrityInfo: this.celebrity.info});
        this.loadTemplate();
    }

    onCancel(){
        this.isEditMode=false;
        this.loadTemplate();
    }

    submit(){
        const formData = this.BuildFormData();

        this.celebrityService.updateCelebrity(this.id, formData).subscribe((resp) => {
            //if(resp.status === 200){
            this.isEditMode = false;
            this.celebrity = resp;
            this.loadTemplate();
        //}
        });
    }

    private getCelebrityById(){
        this.celebrityService.getCelebrity(this.id).subscribe((resp) => {
            this.celebrity = resp.body;
            this.createForm();
        })
    }

    private createForm(){
        this.celebrityForm = this.formBuilder.group({      
            "celebrityName": [null, [Validators.required], [uniqueCelebrityNameValidator(this.celebrity.name, this.celebrityService)], {updateOn: 'blur'}],
            "celebrityInfo": [null],
            "celebrityAvatar": [null, [allowedFileTypeValidator(this.allowedImageTypes), maxFileSizeValidator(this.maxImageSize)]]});
    }

    private loadTemplate(){
        if (this.isEditMode){
            return this.editTemplate;
        }

        return this.readonlyTemplate;
    }

    private BuildFormData(){
        const formData = new FormData();

        const celebrityName = this.celebrityForm.get('celebrityName').value
        formData.append("name", celebrityName);

        const celebrityInfo = this.celebrityForm.get('celebrityInfo').value
        formData.append("info", celebrityInfo);
        
        const celebrityAvatar = this.celebrityForm.get('celebrityAvatar').value
        formData.append("avatar", celebrityAvatar, celebrityAvatar.name);

        return formData;
    }
}