import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service';
import { Router } from '@angular/router';
import { AppserviceService } from '../../../services/appservice/appservice.service';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrl: './userheader.component.css'
})
export class UserheaderComponent implements OnInit{

  firstName1:string|null = localStorage.getItem('firstName');
  
  searchQuery: string = '';
  isLoggedIn = false;
  cartCount: number = 0;
  allCartItems: [] = [];

  constructor(
    private loginService: LoginService,
    private router: Router,
    private appService: AppserviceService
  ) {}
  firstName = localStorage.getItem('firstName');
  name = this.firstName?.toLocaleUpperCase();

  ngOnInit(): void {
    this.isLoggedIn = !!this.loginService.getToken();
    this.appService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });

    // Initialize the cart count
    this.getAllCartCount();
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
  redirectToSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { name: this.searchQuery },
      });
    }
  }

  getAllCartCount() {
    this.appService.getAllCartItems().subscribe((response: any[]) => {
      this.appService.updateCartCount(response.length); // Sync cart count with service
    });


  }


  
  

  
  
  
  
 
  
  
}
