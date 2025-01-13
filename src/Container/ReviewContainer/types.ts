
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
export interface Users {
  user_id:string;
  user_name: string;
  address: string;
  city?: string;
  ph_no?: string;
  email?: string;
  image?: string;
}

export interface Subscriptions {
  
  user_name: string;
  address: string;
  city?: string;
  ph_no?: string;
  fooditem_name?: string;
  category_name?: string;
  menu_name?: string;
  total_price?:number;
  start_date?: string;
  is_active?:boolean
}