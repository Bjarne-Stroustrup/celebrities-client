import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {CelebrityService} from '../celebrity.service';
import { Celebrity } from './celebrity';
import { allowedFileTypeValidator } from '../validators/allowedFileTypeValidator';
import { maxFileSizeValidator } from '../validators/maxFileSizeValidator';

@Component({
    selector: 'add-celebrity',
    templateUrl: './add-celebrity.component.html',
    providers: [CelebrityService]
})

export class AddCelebrityComponent implements OnInit {
    
    constructor(private celebrityService: CelebrityService,
        private formBuilder: FormBuilder){}

    id: number;
    celebrityForm: FormGroup;
    allowedImageTypes: Array<string> = ["jpeg", "jpg", "ico", "png", "bmp", "gif", "tif", "tiff", "webp"];
    maxImageSize: number = 5242880;
    
    ngOnInit() {
        this.createForm();
    }

    submit(){
        const formData = this.BuildFormData();

        this.celebrityService.addCelebrity(formData).subscribe((resp) => {
            if(resp.status === 200){ 
                alert("yeeeeeaaahh");          
            }});
    }

    private createForm(){
        this.celebrityForm = this.formBuilder.group({      
            "celebrityName": [null, [Validators.required]],
            "celebrityInfo": [null],
            "celebrityAvatar": [null, [allowedFileTypeValidator(this.allowedImageTypes), maxFileSizeValidator(this.maxImageSize)]]});
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