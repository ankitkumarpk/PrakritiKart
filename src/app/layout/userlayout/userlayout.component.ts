import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlayout',
  templateUrl: './userlayout.component.html',
  styleUrl: './userlayout.component.css'
})
export class UserlayoutComponent {
 showMenu:boolean = true;

showSideBar()
{
  this.showMenu = !this.showMenu;
}

}
