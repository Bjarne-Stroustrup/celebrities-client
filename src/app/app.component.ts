import { Component} from '@angular/core';
  
@Component({
    selector: 'app',
    template: `<div id="main">
                    <h1 class="title">Celebrities app</h1>
                    <router-outlet></router-outlet>
               </div>`
})
export class AppComponent {}