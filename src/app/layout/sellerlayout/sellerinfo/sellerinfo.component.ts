import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppserviceService } from '../../../services/appservice/appservice.service';
import { sellerInfo } from '../../../models/seller.model';

@Component({
  selector: 'app-sellerinfo',
  templateUrl: './sellerinfo.component.html',
  styleUrls: ['./sellerinfo.component.css'],
})
export class SellerinfoComponent implements OnInit {
  sellerForm: FormGroup;
  profileImageFile: File | null = null;
  imageError: string | null = null;
  showForm = false;
  seller: any;
  isLoading = true;

  constructor(private fb: FormBuilder, private appservice: AppserviceService) {
    this.sellerForm = this.fb.group({
      storeName: ['', Validators.required],
      description: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: [
        '',
        [Validators.required, Validators.pattern(/^\+?[0-9]*$/)],
      ],
      businessRegistrationNumber: ['', Validators.required],
      ayushLicense: ['', Validators.required],
      gstNumber: ['', Validators.required],
      ProfileImg: [''],
      ProfileImgType: [''],
    });
  }

  ngOnInit(): void {
    this.getSellerInfo();
  }

  // Method to handle image selection and convert to Base64
  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const fileType = file.type;
      if (!fileType.startsWith('image/')) {
        this.imageError = 'Only image files are allowed.';
        this.profileImageFile = null;
        return;
      }

      this.profileImageFile = file;
      this.imageError = null;

      // Convert image to Base64
      const reader = new FileReader();
      reader.onload = () => {
        this.sellerForm.patchValue({
          ProfileImg: reader.result as string, // Base64 string
          ProfileImgType: file.type, // Image MIME type
        });
      };
      reader.readAsDataURL(file);
    }
  }

  // Method to submit the form data
  onSubmit() {
    if (this.sellerForm.valid) {
      const sellerinfo: sellerInfo = this.sellerForm.value as sellerInfo;

      // Attach the image file here if needed
      // sellerinfo.ProfileImg = this.sellerForm.value.ProfileImg;
      // sellerinfo.ProfileImgType = this.sellerForm.value.ProfileImgType;

      this.appservice.addSellerInfo(sellerinfo).subscribe({
        next: (response) => {
          console.log('Seller information submitted successfully:', response);
          this.sellerForm.reset();
          this.profileImageFile = null;
          this.showForm = false;
        },
        error: (error) => {
          console.error('Error submitting seller information:', error);
        },
      });
    } else {
      this.sellerForm.markAllAsTouched();
      if (!this.profileImageFile) {
        this.imageError = 'Profile image is required.';
      }
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.sellerForm.reset();
    this.profileImageFile = null;
    this.imageError = null;
  }

  getSellerInfo(): void {
    this.appservice.getSellerInfo().subscribe(
      (data) => {
        this.seller = data;
        this.sellerForm.patchValue(this.seller);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching seller details', error);
        this.isLoading = false;
      }
    );
  }
}
