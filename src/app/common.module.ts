import { NgModule }      from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ConfirmationPopupComponent } from './confirmation-popup.component'
import { FileUploadComponent } from './file-upload.component'

@NgModule({
    imports: [ BrowserAnimationsModule, MatDialogModule, MatButtonModule ],
    declarations: [ FileUploadComponent, ConfirmationPopupComponent],
    exports:      [ FileUploadComponent, ConfirmationPopupComponent]
})
export class CommonModule { }