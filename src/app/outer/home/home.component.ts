import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { AppserviceService } from '../../services/appservice/appservice.service';
import { Router } from '@angular/router';
import { CartRequest } from '../../models/customer.models';
import { HeaderComponent } from '../../layout/outerlayout/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @ViewChild('productRow')
  productRow!: ElementRef;
  allProducts: any[] = []; 
  filteredProducts: any[] = []; 

  cartRequest: CartRequest = { quantity: 0, productId: 0, sellerId: 0 }; 

  constructor(private appService: AppserviceService, private router: Router) {}

  ngOnInit(): void {
    this.loadHomeProducts();
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  loadHomeProducts() {
    this.appService.getHomeProducts().subscribe((products) => {
      this.allProducts = products; // Store all products
      // Filter products for "Arishtam" category by default
      this.filteredProducts = products.filter(
        (product: { category: string }) => product.category === 'Arishtam'
      );
    });
  }

  filterByCategory(category: string) {
    // Filter the products based on the selected category
    this.filteredProducts = this.allProducts.filter(
      (product) => product.category === category
    );
  }

  addToCart(index: number, quantity: number) {
   
    this.cartRequest.productId = this.filteredProducts[index].productId;
    this.cartRequest.sellerId = this.filteredProducts[index].sellerId;
    console.log(this.cartRequest.productId);
    this.cartRequest.quantity = quantity;

    this.appService.addToCartRequest(this.cartRequest).subscribe((response) => {
      console.log(response, 'Item or product added to cart');
      this.appService.getAllCartItems().subscribe((cartItems: any[]) => {
        const cartCount = cartItems.length;
        this.appService.updateCartCount(cartCount); // Update the cart count in the service
      });
    });
  }

  scrollLeft() {
    const scrollContainer = this.productRow.nativeElement;
    scrollContainer.scrollBy({ left: -200, behavior: 'smooth' }); // Adjust 200 to control scroll distance
  }

  scrollRight() {
    const scrollContainer = this.productRow.nativeElement;
    scrollContainer.scrollBy({ left: 200, behavior: 'smooth' }); // Adjust 200 to control scroll distance
  }

  slides = [
    { image: 'assets/home-banner-1.jpg', text: '', alt: 'Image 1' },
    { image: 'assets/home-banner-2.jpg', text: '', alt: 'Image 2' },
    { image: 'assets/home-banner-3.jpg', text: '', alt: 'Image 3' },
    { image: 'assets/home-banner-4.jpg', text: '', alt: 'Image 4' },
  ];

  currentSlide = 0;

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToProduct(index: number) {
    const productId = this.filteredProducts[index].productId;
    this.router.navigate(['product', productId]);
  }
}
