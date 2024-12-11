import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {

  constructor() { }

  openCheckout(orderId: string, amount: number, currency: string, userEmail: string) {
    const options: any = {
      key: 'your-razorpay-key-id', // Add your Razorpay Key ID here
      amount: amount * 100, // Razorpay takes amount in paise
      currency: currency,
      name: 'Your Company Name',
      description: 'Order Payment',
      order_id: orderId,
      handler: (response: any) => {
        console.log('Payment Successful', response);
        // You can emit events or notify the backend here
      },
      prefill: {
        email: userEmail,
        contact: '',
      },
      theme: {
        color: '#528FF0',
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  }
}
