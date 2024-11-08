import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';

@Component({
  selector: 'app-sellerheader',
  templateUrl: './sellerheader.component.html',
  styleUrl: './sellerheader.component.css'
})
export class SellerheaderComponent {
  isLoggedIn = false;
  cartCount = 2;
  constructor(private loginService: LoginService, private router: Router) {
   
  }
  firstName=localStorage.getItem('firstName');
  name = this.firstName?.toLocaleUpperCase();
  

  ngOnInit(): void {
    this.isLoggedIn = !!this.loginService.getToken();
  }

  logout(): void {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['login/user']);
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
  }
  
  isCollapsed = true;

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }
  

}
