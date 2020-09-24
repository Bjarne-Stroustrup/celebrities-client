import {Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {CelebrityService} from '../celebrity.service';
import { allowedFileTypeValidator } from '../validators/allowedFileTypeValidator';
import { maxFileSizeValidator } from '../validators/maxFileSizeValidator';
import { uniqueCelebrityNameValidator } from '../validators/uniqueCelebrityNameValidator';

@Component({
    selector: 'add-celebrity',
    templateUrl: './add-celebrity.component.html',
    providers: [CelebrityService]
})

export class AddCelebrityComponent{
    
    constructor(private celebrityService: CelebrityService,
        private formBuilder: FormBuilder, private router: Router){
            this.createForm();
        }

    id: number;
    celebrityForm: FormGroup;
    allowedImageTypes: Array<string> = ["jpeg", "jpg", "ico", "png", "bmp", "gif", "tif", "tiff", "webp"];
    maxImageSize: number = 5242880;
    
    submit(){
        const formData = this.BuildFormData();

        this.celebrityService.addCelebrity(formData).subscribe((resp) => {
            if(resp.status === 200){ 
                this.goToCelebritiesGrid();      
            }});
    }

    onCancel(){
        this.goToCelebritiesGrid();
    }

    private createForm(){
        this.celebrityForm = this.formBuilder.group({      
            "celebrityName": [null, [Validators.required], [uniqueCelebrityNameValidator(this.celebrityService)], {updateOn: 'blur'}],
            "celebrityInfo": [null],
            "celebrityAvatar": [null, [allowedFileTypeValidator(this.allowedImageTypes), maxFileSizeValidator(this.maxImageSize)]]});
    }

    private BuildFormData(){
        const formData = new FormData();

        const celebrityName = this.celebrityForm.get('celebrityName').value
        formData.append("name", celebrityName);

        const celebrityInfo = this.celebrityForm.get('celebrityInfo').value
        if (celebrityInfo !== null){
            formData.append("info", celebrityInfo);
        }
        
        const celebrityAvatar = this.celebrityForm.get('celebrityAvatar').value
        formData.append("avatar", celebrityAvatar, celebrityAvatar.name);

        return formData;
    }

    private goToCelebritiesGrid() {
        this.router.navigate(['admin/celebrities']);
    }
}