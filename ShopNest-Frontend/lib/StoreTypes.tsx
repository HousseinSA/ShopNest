export interface Billboard {
  id: string
  label: string
  imageUrl: string
}
export interface Category {
  id: string  
  name: string
  billboard: Billboard
}

export interface Product {
  id:string
  name:string
  brand:string
  description:string
  price:number
  isFeatured:boolean 
  category:Category
  size:Size
  color:Color
  images:Image[]
}

export interface Color {
  id:string
  name:string
  value:string
}
export interface Size {
  id:string
  name:string
  value:string
}
export interface Image {
  id:string
  url:string
}
// types/CartItem.ts
export interface CartItem {
  id: string; // or number, depending on your setup
  name: string;
  price: number; // Ensure price is defined as a number
  quantity: number; // If applicable
}