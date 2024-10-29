import { Component } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrl: './userheader.component.css'
})
export class UserheaderComponent {

  firstName1:string|null = localStorage.getItem('firstName');
  firstName = this.firstName1?.toLocaleUpperCase();
  
  
}
