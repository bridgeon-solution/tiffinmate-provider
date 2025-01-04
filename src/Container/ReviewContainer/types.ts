
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
}
export interface Users {
  
  user_name: string;
  address: string;
  city?: string;
  ph_no?: string;
  email?: string;
  image?: string;
}