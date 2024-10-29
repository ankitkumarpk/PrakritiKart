import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Any additional initialization logic can go here
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Handle form submission
      console.log('Contact Form Submitted', this.contactForm.value);
      
      // Reset the form after submission
      this.contactForm.reset();
    }
  }
}
