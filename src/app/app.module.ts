import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule } from '@angular/router';
import { AppComponent }   from './app.component';
import { UserModule }   from './user/user.module';
import { CelebrityRecognitionComponent } from './user/celebrity-recognition.component';
import { AdminModule }   from './admin/admin.module';
import { CelebrityGridComponent } from './admin/Celebrity-grid.component';
import { CelebrityDetailsComponent }   from './admin/celebrity-details.component';

const appRoutes: Routes =[
    { path: 'admin/celebrities', component: CelebrityGridComponent },
    { path: 'admin/celebrity-details/:id', component: CelebrityDetailsComponent },
    { path: '', component: CelebrityRecognitionComponent }
];

@NgModule({
    imports:      [ BrowserModule, RouterModule.forRoot(appRoutes), AdminModule, UserModule ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }