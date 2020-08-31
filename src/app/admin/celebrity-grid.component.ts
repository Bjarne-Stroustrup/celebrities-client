import {Component, OnInit} from '@angular/core';
import {GridCelebrity} from './grid-celebrity';
import {CelebrityService} from '../celebrity.service';
import {Router} from '@angular/router';
   
@Component({ 
    selector: 'celebrities-grid', 
    templateUrl: './celebrity-grid.component.html',
    providers: [CelebrityService]
}) 
export class CelebrityGridComponent implements OnInit {
          
    celebrities: Array<GridCelebrity>;
       
    constructor(private celebrityService: CelebrityService, private router: Router) {
        this.celebrities = new Array<GridCelebrity>();
        }
       
    ngOnInit() {
        this.loadCelebrities();
    }
       
    private loadCelebrities() {
        this.celebrityService.getCelebrities().subscribe((data: GridCelebrity[]) => {
                this.celebrities = data; 
            });
    }

    goToDetails(id: number) {
        this.router.navigate(['admin/celebrity-details', id]);
    }
}