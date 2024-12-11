import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from '@angular-slider/ngx-slider';
import { AppserviceService } from '../../../services/appservice/appservice.service';
import { CartRequest } from '../../../models/customer.models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css'],
})
export class SearchpageComponent implements OnInit {
  @ViewChild('topAnchor') topAnchor!: ElementRef;

  searchParams = {
    name: '',
    category: '',
    minPrice: 100, // Default minimum price
    maxPrice: 1000, // Default maximum price
    rating: null as number | null,
  };
  cartRequest: CartRequest = { quantity: 0, productId: 0, sellerId: 0 };

  Products: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 12;
  totalCount: number = 0;
  showSpinner = false;

  sliderOptions: Options = {
    floor: 0,
    ceil: 1000,
    step: 50,
    translate: (value: number): string => `₹${value}`,
  };

  constructor(
    private appService: AppserviceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.searchParams.name = params['name'] || '';
      this.searchParams.category = params['category'] || '';
      this.searchParams.minPrice = params['minPrice'] ? +params['minPrice'] : 100;
      this.searchParams.maxPrice = params['maxPrice'] ? +params['maxPrice'] : 1000;
      this.searchParams.rating = params['rating'] ? +params['rating'] : null;
      this.currentPage = params['page'] ? +params['page'] : 1;
      this.fetchProducts();
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.updateUrl();
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.showSpinner=true;
    this.appService
      .searchProducts(this.searchParams, this.currentPage, this.pageSize)
      .subscribe(
        (data) => {
          this.Products = data.products;
          this.totalCount = data.totalCount;
          this.totalPages = Math.max(Math.ceil(this.totalCount / this.pageSize), 1);
          this.scrollToTop();
          this.showSpinner=false;
        },
        (error) => {
          console.error('Error fetching products:', error);
          this.showSpinner=false;
        }
      );
  }

  goToPage(page: number): void {
    if (this.isValidPage(page)) {
      this.currentPage = page;
      this.updateUrl();
      this.fetchProducts();
    }
  }

  updateUrl(): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        name: this.searchParams.name,
        category: this.searchParams.category,
        minPrice: this.searchParams.minPrice,
        maxPrice: this.searchParams.maxPrice,
        rating: this.searchParams.rating,
        page: this.currentPage,
      },
      queryParamsHandling: 'merge',
    });
  }

  goToProduct(index: number): void {
    const productId = this.Products[index].productId;
    this.router.navigate(['product', productId]);
  }

  addToCart(index: number, quantity: number) {
    // Ensure cartRequest is properly initialized
    this.cartRequest.productId = this.Products[index].productId;
    this.cartRequest.sellerId = this.Products[index].sellerId;
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

  scrollToTop(): void {
    if (this.topAnchor) {
      this.topAnchor.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  isValidPage(page: number): boolean {
    return page >= 1 && page <= this.totalPages;
  }
}
