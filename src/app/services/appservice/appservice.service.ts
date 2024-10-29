import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from '../../models/address.model';

@Injectable({
  providedIn: 'root',
})
export class AppserviceService {
  private apiUrl = 'http://localhost:5041/api';
  constructor(private http: HttpClient) {}

  //#########################  Address Service  ###########################

  getUserAddresses(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Address/all/addresses`);
  }
  // /Address/add/{userId}

  addAddress(addressData: Address): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Address/add`, addressData);
  }

  updateAddress(addressId: number, address: Address): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/Address/edit/${addressId}`,
      address
    );
  }

  deleteAddress(addressId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Address/delete/${addressId}`);
  }
}
