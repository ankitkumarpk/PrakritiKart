import { Component } from '@angular/core';
import { AppserviceService } from '../../../services/appservice/appservice.service';
import { CartItem, CartRequest } from '../../../models/customer.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrl: './cartpage.component.css'
})
export class CartpageComponent {
  cartItems: any[] = [];
  totalAmount: number = 0;
  showSpinner = false;

  constructor(private appService: AppserviceService, private router:Router) {}

  cartItemUpdationRequest: CartRequest = { quantity: 0, productId: 0, sellerId: 0 };

  ngOnInit(): void {
    this.getCartItemsWithDetail();
  }

  getCartItemsWithDetail(): void {
    this.appService.getAllCartItemsWithDetail().subscribe((response: CartItem[]) => {
      this.cartItems = response;
      this.calculateTotal();
    });
  }



  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  proceedToBuy(cartItems:any[]): void {
    const token = localStorage.getItem('authToken');
    if(token)
    {
      const selectedProduct = cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }));
      console.log(selectedProduct);
      this.appService.setCheckoutProducts(selectedProduct);
      this.router.navigate(['/checkout']);
    } else {
      this.router.navigate(['/login/user'])
    }
  }

  goToProduct(index: number): void {
    const productId = this.cartItems[index].productId;
    this.router.navigate(['product', productId]);
  }

  updateItemQuantity(index:number,quantity:number)
  {
    this.showSpinner = true;
    this.cartItemUpdationRequest.productId = this.cartItems[index].productId;
    this.cartItemUpdationRequest.quantity = quantity;
    this.cartItemUpdationRequest.sellerId = this.cartItems[index].sellerId;

    this.appService.addToCartRequest(this.cartItemUpdationRequest).subscribe((response)=>{
      console.log(response,"cart is updated");
      this.getCartItemsWithDetail();
      this.showSpinner=false;
    })

  }

  removeItemFormCart(index:number)
  {
    this.showSpinner = true;
    const cartId = this.cartItems[index].cartId;
    this.appService.removeItemFromCart(cartId).subscribe((response)=>{
      console.log(response, "Item removed from cart succesfully");
      this.getCartItemsWithDetail();
      this.showSpinner=false;
    })

  }

}
