import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './services/auth/login.service'; // Import your LoginService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!this.loginService.getToken(); // Check if token exists

    if (!isLoggedIn) {
      // If not logged in, redirect to home page
      this.router.navigate(['/']);
      return false;
    }

    // If logged in, allow access
    return true;
  }
}
