export interface CartRequest {
  quantity: number;
  productId: number;
  sellerId:number;
}

export interface CartItem {
  id: number;
  productName: string;
  price: number;
  imageUrl: string;
  rating: number;
  quantity: number;
}
