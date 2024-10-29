import { Component } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-commonheader',
  templateUrl: './commonheader.component.html',
  styleUrl: './commonheader.component.css'
})
export class CommonheaderComponent {

  isLoggedIn = false;
  dropdownOpen: boolean = false;
  
  

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.loginService.getToken();
  }

  logout(): void {
    this.loginService.logout();
    this.isLoggedIn = false;
  }
 

  logoclick(event: MouseEvent): void {
    event.preventDefault();
    this.dropdownOpen = !this.dropdownOpen; // Toggle dropdown visibility
  }

  
 

}
