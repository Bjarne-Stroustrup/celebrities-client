import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CelebrityService } from '../celebrity.service';
import { SimilarCelebrity } from './similar-celebrity';
import { allowedFileTypeValidator } from '../validators/allowedFileTypeValidator';
import { maxFileSizeValidator } from '../validators/maxFileSizeValidator';

@Component({
    selector: 'celebrity-recognition',
    templateUrl: './celebrity-recognition.component.html',
    providers: [ CelebrityService ]
})

export class CelebrityRecognitionComponent implements OnInit {
    
    constructor(private celebrityService: CelebrityService, private formBuilder: FormBuilder){}
 
    recognitionForm: FormGroup;
    similarCelebrities: Array<SimilarCelebrity>;
    allowedImageTypes: Array<string> = ["jpeg", "jpg", "ico", "png", "bmp", "gif", "tif", "tiff", "webp"];
    maxImageSize: number = 5242880;
    
    ngOnInit() {
        this.createForm();
    }

    private createForm(){
        this.recognitionForm = this.formBuilder.group({
             "image": [null, [Validators.required, allowedFileTypeValidator(this.allowedImageTypes),
                 maxFileSizeValidator(this.maxImageSize)]]
        });
    }

    submit(){
        const formData = new FormData();
        const image = this.recognitionForm.get('image').value
        formData.append('image', image, image.name);

        this.similarCelebrities = Array<SimilarCelebrity>();
        this.celebrityService.recognizeFace(formData)
          .subscribe((data: SimilarCelebrity[]) => {
            this.similarCelebrities = data;
        });
    }
}