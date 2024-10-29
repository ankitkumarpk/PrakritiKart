import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';

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

  loginFailed: boolean = false; // Flag to indicate login failure

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.loginService
        .login(this.loginForm.value.email, this.loginForm.value.password, this.loginForm.value.userType)
        .subscribe(
          (response) => {
            this.loginService.storeToken(response.token);
            const firstName = response.firstName; // Assuming the response contains the user's email
            const userType = response.userType;
            // Store the token and email in localStorage
            
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('userType',userType);
            this.router.navigate(['/user']);
          },
          (error) => {
            this.loginFailed = true;
            console.error('Login failed', error);
          }
        );
    }
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
