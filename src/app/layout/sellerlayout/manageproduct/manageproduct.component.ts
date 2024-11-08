import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppserviceService } from '../../../services/appservice/appservice.service';

@Component({
  selector: 'app-manageproduct',
  templateUrl: './manageproduct.component.html',
  styleUrls: ['./manageproduct.component.css']
})
export class ManageproductComponent {
  productForm: FormGroup;
  selectedImages: File[] = [];
  imagePreviews: string[] = [];
  showForm = false;

  constructor(private fb: FormBuilder, private appService: AppserviceService) {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],  // Required validation
      category: ['', [Validators.required]],     // Required validation
      price: [null, [Validators.required, Validators.min(0)]], // Min value validation
      quantity: [null, [Validators.required, Validators.min(0)]], // Min value validation
      description: ['', [Validators.required]],  // Required validation
      ingredients: ['', [Validators.required]],  // Required validation
      dosageInstructions: ['', [Validators.required]],  // Required validation
      imageUrl: [null]  // Form control for image selection (will be Base64 encoded)
    });
  }

  // Handle image selection and convert to Base64
  onImageSelected(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.selectedImages = Array.from(files);

      // Generate image previews and convert each file to Base64
      this.imagePreviews = [];
      this.selectedImages.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // Store the Base64 image string
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);  // Convert the image file to Base64
      });
    }
  }

  // Handle form submission
  onSubmit(): void {
    if (this.productForm.invalid) {
      console.log('Form is invalid');
      this.productForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('productName', this.productForm.get('productName')?.value);
    formData.append('category', this.productForm.get('category')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('quantity', this.productForm.get('quantity')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('ingredients', this.productForm.get('ingredients')?.value);
    formData.append('dosageInstructions', this.productForm.get('dosageInstructions')?.value);

    // Append each Base64 image to the form data
    this.imagePreviews.forEach(base64Image => {
      formData.append('imageUrl', base64Image);  // Send Base64 image string
    });

    // Now you can send formData to your API
    console.log('Form Data', formData);

    this.appService.addProduct(formData).subscribe({
      next: (response) => {
        console.log(response);
        this.productForm.reset();
        this.selectedImages = [];
        this.imagePreviews = [];
        this.showForm = false;
      },
      error: (err) => {
        console.error('Error submitting product:', err);
      }
    });
  }

  // Toggle form visibility
  toggleForm() {
    this.showForm = !this.showForm;
    this.productForm.reset();
  }
}
