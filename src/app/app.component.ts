import { Component} from '@angular/core';
  
@Component({
    selector: 'app',
    template: `<div>
                    <h1>Celebrities</h1>
                    <router-outlet></router-outlet>
               </div>`
})
export class AppComponent {}