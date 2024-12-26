import React, { useEffect, useState } from 'react'; 
import {MenuDisplay} from '../../Component/DisplayMenu/index';
import {Getcategory,Getfooditem} from '../../Services/AddMenu/index';

interface Menu {
  id: string; 
  category_name: string; 
  created_at: string;
  updated_at: string;
  food_items: null; 
}

interface FoodItem {
  category_id: string;
  provider_id: string;
  menu_id: string;
  food_name: string;
  price: number;
  description: string;
  day: string;
  image?: string;
}

const DisplayMenuDetails: React.FC = () => {
  const [MenuList, setMenuList] = useState<Menu[]>([]);
  const [FoodList, setFoodList] = useState<FoodItem[]>([]);
  const [Error, setError] = useState<string | null>(null);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        const providerId = localStorage.getItem("id");
        if (!providerId) {
          setError('Provider ID is missing.');
          setLoading(false);
          return;
        }
        const menuData = await Getcategory();
        const foodData = await Getfooditem(providerId);
       
        setMenuList(menuData|| []);
        setFoodList(foodData || []); 
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch menu or food items. Please try again later.');
        setLoading(false);
      }
    };
    

    fetchMenuData();
  }, []);

  return (
    <MenuDisplay
      menuList={MenuList}
      foodItems={FoodList} 
      loading={Loading}
      error={Error}
    />
  );
};

export default DisplayMenuDetails;
