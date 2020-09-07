import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule }   from '@angular/common/http';
import { CommonModule } from '../common.module'
import { CelebrityRecognitionComponent } from './celebrity-recognition.component';

@NgModule({
    imports:      [ BrowserModule, ReactiveFormsModule, HttpClientModule, CommonModule ],
    declarations: [ CelebrityRecognitionComponent],
    exports:      [ CelebrityRecognitionComponent ]
})
export class UserModule { }