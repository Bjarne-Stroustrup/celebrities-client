import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent }   from './app.component';
import { UserModule }   from './user/user.module';
import { CelebrityRecognitionComponent } from './user/celebrity-recognition.component';
import { AdminModule }   from './admin/admin.module';
import { CelebrityGridComponent } from './admin/Celebrity-grid.component';
import { AddCelebrityComponent } from './admin/add-celebrity.component';
import { CelebrityDetailsComponent }   from './admin/celebrity-details.component';
import { TrainCelebrityComponent }   from './admin/train-celebrity.component';
import { LoginComponent } from './admin/login.component';

const appRoutes: Routes =[
    { path: 'admin/login', component: LoginComponent },
    { path: 'admin/celebrities', component: CelebrityGridComponent },
    { path: 'admin/add-celebrity', component: AddCelebrityComponent },
    { path: 'admin/celebrity-details/:id', component: CelebrityDetailsComponent },
    { path: 'admin/train-celebrity/:id', component: TrainCelebrityComponent },
    { path: '', component: CelebrityRecognitionComponent }
];

@NgModule({
    imports:      [ BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule, AdminModule, UserModule ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }