import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material/dialog';

@Component({
  selector: 'confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
})

export class ConfirmationPopupComponent {
    constructor(public dialogRef: MatDialogRef<ConfirmationPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public message: string) { }
  
    onNoClick(): void {
    this.dialogRef.close();
  }
}