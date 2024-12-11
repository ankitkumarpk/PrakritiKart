import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from '../../../services/appservice/appservice.service';
import { Title } from '@angular/platform-browser';
import { CartRequest } from '../../../models/customer.models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrl: './productpage.component.css',
})
export class ProductpageComponent implements OnInit {
  product: any;
  selectedImage: string = '';
  isFullScreen: boolean = false; // Controls the full-screen modal visibility
  pageTitle: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private appService: AppserviceService,
    private title: Title,
    private toastr: ToastrService,
    private router: Router
  ) {}
  cartRequest: CartRequest = { quantity: 0, productId: 0, sellerId: 0 };

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById() {
    const productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    if (productId) {
      this.appService.getProductById(productId).subscribe((data) => {
        this.product = data;
        this.product.mainImageUrl = data.images[0].imageUrl;
        this.setPageTitle();
      });
    }
  }

  setPageTitle() {
    this.title.setTitle(this.product.productName);
  }

  setMainImage(image: any): void {
    this.product.mainImageUrl = image.imageUrl;
  }

  addToCart(index: number, quantity: number) {
    // Ensure cartRequest is properly initialized
    this.cartRequest.productId = this.product.productId;
    this.cartRequest.sellerId = this.product.sellerId;
    console.log(this.cartRequest.productId);
    this.cartRequest.quantity = quantity;

    this.appService.addToCartRequest(this.cartRequest).subscribe((response) => {
      console.log(response, 'Item or product added to cart');
      this.toastr.success('Item Added in Cart successfully', 'Success', {
        positionClass: 'toast-top-center',  // Default top-center positioning
      });

      this.appService.getAllCartItems().subscribe((cartItems: any[]) => {
        const cartCount = cartItems.length;
        this.appService.updateCartCount(cartCount); // Update the cart count in the service
      });
    });
  }

  buyNow(product: any) {
    console.log(product);
    const token = localStorage.getItem('authToken');
    if(token)
    {
      const selectedProduct = [
        {
          productId: product.productId,
          quantity: 1,
        },
        
      ];
      console.log(selectedProduct);
      this.appService.setCheckoutProducts(selectedProduct);
      this.router.navigate(['/checkout']);
    } else {
      this.router.navigate(['/login/user'])
    }
    
    
  }
  

  // Open full-screen modal
  openFullScreen(imageUrl: string): void {
    this.selectedImage = imageUrl;
    this.isFullScreen = true;
  }

  // Close full-screen modal
  closeFullScreen(): void {
    this.isFullScreen = false;
  }
}
