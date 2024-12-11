import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Address } from '../../models/address.model';
import { sellerInfo } from '../../models/seller.model';
import { CartRequest } from '../../models/customer.models';

@Injectable({
  providedIn: 'root',
})
export class AppserviceService {
  private apiUrl = 'http://localhost:5041/api';
  constructor(private http: HttpClient) {}

  //#########################  Address Service  ###########################

  getUserAddresses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Customer/address/all`);
  }
  // /Address/add/{userId}

  addAddress(addressData: Address): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/Customer/address/add`,
      addressData
    );
  }

  updateAddress(addressId: number, address: Address): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/Customer/address/edit/${addressId}`,
      address
    );
  }

  deleteAddress(addressId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/Customer/address/delete/${addressId}`
    );
  }

  // ################## Homepage Produts Loading #############################

  loadHomeProduct(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Customer/get-home-product`);
  }

  //################## Seller Services  ######################################

  addSellerInfo(sellerInfo: sellerInfo): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/Seller/add/sellerinfo`,
      sellerInfo,
      {
        headers: { Accept: 'application/json' }, // No 'Content-Type' needed, Angular sets it for FormData
      }
    );
  }

  getSellerInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Seller/requiredinfo`);
  }

  // ##################### Seller product CRUD #############3
  addProduct(productData: FormData): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/Seller/product/add`,
      productData
    );
  }
  getProducts(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/Seller/product/getall`);
  }
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/Seller/product/delete/${productId}`
    );
  }
  editProduct(productId: number, productData: FormData): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/Seller/product/edit/${productId}`,
      productData
    );
  }

  //####################### Home page products ##########################
  getHomeProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Customer/get-home-product`);
  }

  getProductById(productId: any): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/Customer/get-product/${productId}`
    );
  }

  searchProducts(
    searchParams: any,
    page: number,
    pageSize: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('name', searchParams.name)
      .set('category', searchParams.category || '')
      .set('minPrice', searchParams.minPrice?.toString() || '')
      .set('maxPrice', searchParams.maxPrice?.toString() || '')
      .set('rating', searchParams.rating?.toString() || '')
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.apiUrl}/Customer/search-products`, {
      params,
    });
  }

  //##############  CART Service ##################################
  //############Cart Count V  Tough ###########

  private cartCountSource = new BehaviorSubject<number>(0); 
  cartCount$ = this.cartCountSource.asObservable();

  updateCartCount(count: number) {
    this.cartCountSource.next(count); // Update the cart count
  }

  addToCartRequest(data: CartRequest): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/Customer/cart/add-to-cart`,
      data
    );
  }

  getAllCartItems(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/Customer/cart/get-all-cart-items`
    );
  }

  getAllCartItemsWithDetail():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/Customer/cart/all-cart-items-with-details`);
  }

  removeItemFromCart(cartId:any):Observable<void>
  {
    return this.http.delete<void>(`${this.apiUrl}/Customer/cart/remove-item-from-cart/${cartId}`);
  }

  //############### Checkout data share 

  private checkoutProducts: any[] = []; // Store products

  setCheckoutProducts(products: any[]): void {
    this.checkoutProducts = products;
    console.log(this.checkoutProducts);
  }

  getCheckoutProducts(): any[] {
    return this.checkoutProducts;
  }

  clearProducts(): void {
    this.checkoutProducts = [];
  }


  //####################### Payment opt ###################
  createOrder( amount: number): Observable<any> {
    const url = `${this.apiUrl}/Customer/create-order`;
    return this.http.post(url, { amount });
  }

  verifyPayment(razorpayOrderId: string, razorpayPaymentId: string, razorpaySignature: string, products:any[]): Observable<any> {
    const url = `${this.apiUrl}/Customer/verify-payment`;
    return this.http.post(url, { razorpayOrderId, razorpayPaymentId, razorpaySignature,products });
  }

  //####################   Grt Ordered Items #############

  getOrderedItems():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/Customer/order/get-order-items`)
  }
}
