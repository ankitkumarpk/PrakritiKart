
import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../../../services/appservice/appservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userorder',
  templateUrl: './userorder.component.html',
  styleUrl: './userorder.component.css',
})
export class UserorderComponent implements OnInit {
  orderedItems: any[] = [];
  constructor(private appService: AppserviceService, private router:Router) {}
  
  ngOnInit(): void {
    this.appService.getOrderedItems().subscribe(response=>{
      this.orderedItems= response;
      console.log(this.orderedItems);
    });
  }
  goToProduct(productId:number)
  {
    this.router.navigate([`/product/${productId}`])
  }
}
