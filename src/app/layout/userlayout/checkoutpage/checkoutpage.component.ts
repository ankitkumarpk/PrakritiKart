import { ChangeDetectorRef, Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from '../../../services/appservice/appservice.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

declare var Razorpay: any;

@Component({
  selector: 'app-checkoutpage',
  templateUrl: './checkoutpage.component.html',
  styleUrls: ['./checkoutpage.component.css'],
})
export class CheckoutpageComponent implements OnInit {
  products: any[] = [];
  productsData: any[] = [];
  totalAmount: number = 0;
  isOrderSuccess: boolean = false;
  showModal :boolean = false;
  placeOrderId: string = '';
  counter:number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppserviceService,
    private location: Location,private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    try {
      this.products = this.appService.getCheckoutProducts();
      console.log('Products from service:', this.products);

      if (this.products && this.products.length > 0) {
        this.fetchProductDetails(this.products);
      } else {
        console.warn('No products found in the service');

        this.location.back();
        this.router.navigate(['/cart'])
      }
    } catch (error) {
      console.error('Error fetching products:', error);

      this.location.back();
    }
  }

  fetchProductDetails(selectedProducts: any[]): void {
    const productRequests = selectedProducts.map((selectedProduct) => {
      return this.appService
        .getProductById(selectedProduct.productId)
        .toPromise()
        .then((product) => {
          console.log('Fetched product:', product);
          return {
            ...product,
            quantity: selectedProduct.quantity,
          };
        });
    });

    Promise.all(productRequests)
      .then((detailedProducts) => {
        this.productsData = detailedProducts; // Assign detailed products
        console.log('Final productsData:', this.productsData); // Debug log
        this.calculateTotal(); // Calculate total after fetching data
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }

  calculateTotal(): void {
    this.totalAmount = this.productsData.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }

  proceedToPayment(): void {
    if (this.totalAmount > 0) {
      console.log('Proceeding to payment...');
    } else {
      console.warn('Total amount is zero. Cannot proceed to payment.');
    }
  }

  createOrder() {
    const amount = this.totalAmount;
    this.appService.createOrder(amount).subscribe({
      next: (response) => {
        console.log('Order created successfully:', response);
        this.initiateRazorpayPayment(
          response.razorpayOrderId,
          response.paymentId,
          amount,
        );
        this.placeOrderId= response.razorpayOrderId;
      },
      error: (error) => {
        console.error('Error creating order:', error);
      },
    });
  }

  initiateRazorpayPayment(razorpayOrderId: string, paymentId: string, amount: number) {
    const options: any = {
      key: 'rzp_test_T484g6IpAEzDYC', // Replace with your Razorpay Key
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      name: 'PrakritiKart',
      description: 'Order Payment',
      order_id: razorpayOrderId,
      handler: (response: any) => {
        console.log('Payment success:', response);
        console.log(response.razorpay_signature);
        
        this.verifyPayment(razorpayOrderId,response.razorpay_payment_id,response.razorpay_signature,this.products);
      },
      theme: {
        color: '#3399cc',
      },
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
  }

  verifyPayment(razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string, products:any[]) {
    this.appService.verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature,products).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Payment verified successfully:', response.message);
          this.isOrderSuccess=true;
          this.showModal=true;
          this.counter = 6;
          setInterval(()=>{
            this.counter--;
            this.cdRef.detectChanges(); 
          },1000)
          
          setTimeout(()=>{
            this.router.navigate(['/user/order']);
          },6000)
          
        } else {
          console.error('Payment verification failed:', response.message);
         
          
        }
      },
      error: (error) => {
        console.error('Error verifying payment:', error);
        this.isOrderSuccess=false;
          this.showModal=true;
      },
    });
  }

  
  
  

}
