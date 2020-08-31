import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule }   from '@angular/common/http';
import { CelebrityGridComponent }   from './Celebrity-grid.component';
import { CelebrityDetailsComponent }   from './celebrity-details.component';

@NgModule({
    imports:      [ BrowserModule, FormsModule, HttpClientModule],
    declarations: [ CelebrityGridComponent, CelebrityDetailsComponent],
    exports:      [CelebrityGridComponent, CelebrityDetailsComponent]
})
export class AdminModule { }