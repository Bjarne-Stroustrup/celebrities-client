import {Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication-service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [AuthenticationService]
})
  export class LoginComponent {
      loginForm:FormGroup;
  
      constructor(private formBuilder:FormBuilder, private authenticationService: AuthenticationService,
         private router: Router) {
             this.createForm();
      }
  
      login() {
          const login = this.loginForm.get('login').value
          const password = this.loginForm.get('password').value

          this.authenticationService.getToken(login, password).subscribe((response) => {
                  if(response.status === 200)
                    this.router.navigate(['admin/celebrities']);
                });
          }

      createForm(){
          this.loginForm = this.formBuilder.group({
              "login": [null, [Validators.required], null, {updateOn: 'blur'}],
              "password": [null, [Validators.required]],
          });
      }
  }