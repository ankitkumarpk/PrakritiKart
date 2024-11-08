import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../../models/address.model';
import { sellerInfo } from '../../models/seller.model';

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
    return this.http.post<any>(`${this.apiUrl}/Customer/address/add`, addressData);
  }

  updateAddress(addressId: number, address: Address): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/Customer/address/edit/${addressId}`,
      address
    );
  }

  deleteAddress(addressId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Customer/address/delete/${addressId}`);
  }




  //################## Seller Services  #######################

  addSellerInfo(sellerInfo : sellerInfo):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/Seller/add/sellerinfo`,sellerInfo,  {
      headers: { 'Accept': 'application/json' },  // No 'Content-Type' needed, Angular sets it for FormData
    });
  }
  
  getSellerInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Seller/requiredinfo`);
  }


  // ##################### Seller product CRUD #############3
  addProduct(productData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Seller/add/product`, productData);
  }
}
