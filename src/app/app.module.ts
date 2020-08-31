import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent }   from './app.component';
import { CelebrityDetailsComponent }   from './admin/celebrity-details.component';
import { AdminModule }   from './admin/admin.module';
import { UserModule }   from './user/user.module';
import { CelebrityGridComponent } from './admin/Celebrity-grid.component';

const appRoutes: Routes =[
    { path: 'admin/celebrities', component: CelebrityGridComponent },
    { path: 'admin/celebrity-details/:id', component: CelebrityDetailsComponent },
];

@NgModule({
    imports:      [ BrowserModule, AdminModule, UserModule, RouterModule.forRoot(appRoutes)],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }