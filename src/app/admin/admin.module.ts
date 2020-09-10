import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }   from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from "../common.module";
import { CelebrityGridComponent }   from './Celebrity-grid.component';
import { CelebrityDetailsComponent }   from './celebrity-details.component';

@NgModule({
    imports:      [ BrowserModule, ReactiveFormsModule, HttpClientModule, CommonModule],
    declarations: [ CelebrityGridComponent, CelebrityDetailsComponent ],
    exports:      [ CelebrityGridComponent, CelebrityDetailsComponent ]
})
export class AdminModule { }