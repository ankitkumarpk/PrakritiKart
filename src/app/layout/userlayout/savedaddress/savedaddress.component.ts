import { Component, OnInit } from '@angular/core';
import { Address } from '../../../models/address.model';
import { AppserviceService } from '../../../services/appservice/appservice.service';
import { LoginService } from '../../../services/auth/login.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-savedaddress',
  templateUrl: './savedaddress.component.html',
  styleUrl: './savedaddress.component.css',
})
export class SavedaddressComponent implements OnInit {
  selectedAddressIndex: number | null = null;
  constructor(
    private appservice: AppserviceService,
    private loginService: LoginService
  ) {}

  showForm = false;
  // userId = localStorage.getItem('userId');

  // Address form group
  addressForm = new FormGroup({
    fullName:new FormControl('',Validators.required),
    phoneNumber: new FormControl('',Validators.required),
    addressLine1: new FormControl('', Validators.required),
    addressLine2: new FormControl(''),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
  });

  AddressList: any[] = []; // Example data

  toggleForm() {
    this.showForm = !this.showForm;
  }

  cancelForm() {
    this.showForm = false;
    this.addressForm.reset();
  }

  // On form submit
  onSubmit() {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      alert('Fill all required fireld');
      return;
    }
    const addressData: Address = this.addressForm.value as Address;

    if (this.selectedAddressIndex !== null) {
      const addressId = this.AddressList[this.selectedAddressIndex].addressId;
      this.appservice.updateAddress(addressId, addressData).subscribe({
        next: () => {
          this.addressForm.reset();
          this.showForm = false;
          this.loadAllAddress();
        },
      });
    } else {
      this.appservice.addAddress(addressData).subscribe({
        next: () => {
          this.addressForm.reset(); // Reset form
          this.showForm = false;
          this.loadAllAddress();
        },
        error: () => console.log('address saved failed'),
      }); // Push form value to AddressList
      // Hide form
    }
  }

  loadAllAddress() {
    this.appservice.getUserAddresses().subscribe({
      next: (address) => {
        this.AddressList = address;
      },
    });
  }

  ngOnInit(): void {
    this.loadAllAddress();
  }

  editAddress(index: number): void {
    this.showForm = true;
    const address = this.AddressList[index];
    this.selectedAddressIndex = index;
    this.addressForm.patchValue({
      fullName: address.fullName,
      phoneNumber: address.phoneNumber,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
    });
  }

  deleteAddress(index: number) {
    const addressID = this.AddressList[index].addressId;
    this.appservice.deleteAddress(addressID).subscribe({
      next: () => {
        this.loadAllAddress();
      },
      error: () => console.log('delete failed'),
    });
    this.loadAllAddress();
  }
}
