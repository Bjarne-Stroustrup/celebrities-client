import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }   from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from "../common.module";
import { LoginComponent }   from './login.component';
import { CelebrityGridComponent }   from './Celebrity-grid.component';
import { CelebrityDetailsComponent }   from './celebrity-details.component';
import { AddCelebrityComponent }   from './add-celebrity.component';
import { TrainCelebrityComponent } from './train-celebrity.component';

@NgModule({
    imports:      [ BrowserModule, ReactiveFormsModule, HttpClientModule, CommonModule],
    declarations: [ LoginComponent, CelebrityGridComponent, CelebrityDetailsComponent, AddCelebrityComponent, TrainCelebrityComponent],
    exports:      [ LoginComponent, CelebrityGridComponent, CelebrityDetailsComponent, AddCelebrityComponent, TrainCelebrityComponent]
})
export class AdminModule { }