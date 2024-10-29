import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  dropdownOpen: boolean = false;


  constructor(private loginService: LoginService, private router: Router) {
    document.addEventListener('click', this.closeDropdown.bind(this));
    
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

  toggleDropdown(event: MouseEvent): void {
    event.preventDefault(); // Prevent default behavior
    this.dropdownOpen = !this.dropdownOpen; // Toggle dropdown visibility
  }

  closeDropdown(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-profile-dropdown')) {
      this.dropdownOpen = false; // Close dropdown if clicking outside
    }
  }

  // Optionally, listen for clicks on the document to close dropdowns
  

  ngOnDestroy() {
    // Clean up the event listener to prevent memory leaks
    document.removeEventListener('click', this.closeDropdown.bind(this));
  }
}
