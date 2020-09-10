import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationPopupComponent } from '../confirmation-popup.component';
import { CelebrityService } from '../celebrity.service';
import { GridCelebrity } from './grid-celebrity';
  
@Component({
    selector: 'celebrities-grid', 
    templateUrl: './celebrity-grid.component.html',
    providers: [CelebrityService]
}) 
export class CelebrityGridComponent implements OnInit {
          
    celebrities: Array<GridCelebrity>;
       
    constructor(private celebrityService: CelebrityService, private dialog: MatDialog, private router: Router) {
        this.celebrities = new Array<GridCelebrity>();
        }
       
    ngOnInit() {
        this.loadCelebrities();
    }
       
    private loadCelebrities() {
        this.celebrityService.getCelebrities().subscribe((resp) => {
                this.celebrities = resp.body; 
            });
    }

    goToDetails(id: number) {
        this.router.navigate(['admin/celebrity-details', id]);
    }
 
    confirmDeleting(id: number): void {
      const celebrity = this.celebrities.find(c => c.id === id);

      const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
        height: '400px',
        width: '600px',
          data: `Are you sure you want to delete ${celebrity.name}?`,
          panelClass: 'confirmation-popup'
        });
        
        dialogRef.afterClosed().subscribe(result => {
          if(result) {
            this.delete(id)
          }
        });
      }

    private delete(id: number) {
      this.celebrityService.deleteCelebrity(id).subscribe((resp) => {
          if (resp.status == 200){
              const index = this.celebrities.findIndex(c => c.id == id);
              if (index > -1) {
              this.celebrities.splice(index, 1);
          }
          }
      });;
  }
}