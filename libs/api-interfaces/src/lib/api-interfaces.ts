export enum Category {
  BOOKS = 'Books',
  ELECTRONICS = 'Electronics',
  FURNITURE = 'Furniture'
}

export type Rating = 1 | 2 | 3 | 4 | 5;

export interface BasicProduct {
  id: string;
  category: Category;
  price: number;
  title: string;
  url: string;
  rating: Rating;
}

export interface Product extends BasicProduct {
  description: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ProductRating {
  productId: string;
  rating: Rating;
}

export interface Review {
  productId: string;
  reviewer: string;
  reviewText: string;
  reviewDate: number;
}