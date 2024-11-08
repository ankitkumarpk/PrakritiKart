import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Signup } from '../../models/signup.model';
import { LoginService } from '../../services/auth/login.service';
import { SingupService } from '../../services/auth/singup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  // constructor(private signupservice: SingupService) {}

  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    userType: new FormControl('Customer', [Validators.required]),
  });

  ngOnInit(): void {}

  constructor(
    private signupService: SingupService,
    private loginService: LoginService
  ) {}

  onSubmit() {
    // const studentData: Signup = this.signupForm.value;
    const signupData: Signup = this.signupForm.value as Signup;

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
    } else {
      if (this.signupForm.value.userType == 'Customer') {
        this.loginService.customerRegister(signupData).subscribe({
          next: () => {
            console.log(signupData);
            this.signupForm.reset();
          },
          error: () => console.log('registration failed'),
        });
      } else if (this.signupForm.value.userType == 'Seller') {
        this.loginService.sellerRegister(signupData).subscribe({
          next: () => {
            console.log(signupData);
            this.signupForm.reset();
          },
          error: () => console.log('seller registration failed'),
        });
      }
    }
  }

  get firstName() {
    return this.signupForm.get('firstName');
  }
  get lastName() {
    return this.signupForm.get('lastName');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get phoneNumber() {
    return this.signupForm.get('phoneNumber');
  }
}
