
export interface Review {
    id: string;
    username: string;
    review: string;
    image?: string;
    created_at?: string;
  }
  
export interface Orders {
  
  user_name: string;
  address: string;
  city?: string;
  ph_no?: string;
  fooditem_name?: string;
  category_name?: string;
  menu_name?: string;
  total_price?:number;
  start_date?: string;
}
export interface amount {
  
  user_name: string;
  amount: string;
  payment_date?: string;
  is_paid?: string;
}
export interface Users {
  user_id:string;
  user_name: string;
  address: string;
  city?: string;
  ph_no?: string;
  email?: string;
  image?: string;
  payment_history?:Payment[];
  order?:Orders[]
}
export interface Payment {
  
  user_name: string;
  amount: string;
  payment_date?: string;
  is_paid?: string;
}

export interface Subscriptions {
  user_name: string;
  address: string | null;
  city: string | null;
  ph_no: string;
  category?: Category[]; 
  menu_name: string;
  total_price: number;
  start_date: string;
  is_active: boolean;
}
interface FoodItem {
  food_name: string;
  price: number;
  description: string;
  day: string;
  image: string;
}

interface Category {
  category_name: string;
  food_Items: FoodItem[];
}


