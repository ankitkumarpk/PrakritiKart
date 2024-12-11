import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    userType: new FormControl('Customer', [Validators.required]),
    
  });
  showSpinner = false;
  loginFailed: boolean = false; 

  constructor(private spinner: NgxSpinnerService,private loginService: LoginService, private router: Router,private toastr:ToastrService) {}

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.showSpinner=true;
      if(this.loginForm.value.userType == 'Customer'){
        this.loginService
        .customerLogin(this.loginForm.value.email, this.loginForm.value.password, this.loginForm.value.userType)
        .subscribe(
          (response) => {
            this.showSpinner=false;
            this.loginService.storeToken(response.token);
            const firstName = response.firstName; // Assuming the response contains the user's email
            const userType = response.userType;
            // Store the token and email in localStorage
            
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('userType',userType);
            if(userType=='Customer'){
              this.toastr.success("Login successfully");
              this.router.navigate(['/user']);
            } else if(userType=='Seller')
            {
              this.toastr.success("Login successfully");
              this.router.navigate(['/seller/info']);
            }
          },
          (error) => {
            this.loginFailed = true;
            console.error('Login failed', error);
            this.showSpinner=false;
            
            
          }

        );
      } else if(this.loginForm.value.userType == 'Seller')
      {
        this.loginService
        .sellerLogin(this.loginForm.value.email, this.loginForm.value.password, this.loginForm.value.userType)
        .subscribe(
          (response) => {
            this.showSpinner=true;
            this.loginService.storeToken(response.token);
            const firstName = response.firstName; // Assuming the response contains the user's email
            const userType = response.userType;
            // Store the token and email in localStorage
            
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('userType',userType);
            if(userType=='Customer'){
              this.router.navigate(['/user']);
            } else if(userType=='Seller')
            {
              this.router.navigate(['/seller']);
            }
          },
          (error) => {
            this.showSpinner=false;
            this.loginFailed = true;
            console.error('Login failed', error);
            this.router.navigate(['/login']);
          }
        );
      }
      
    }
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
