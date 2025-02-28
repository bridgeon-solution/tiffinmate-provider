import  { useEffect, useState } from 'react';
import { DeleteFoodItems, Getcategory, Getfooditem } from '../../Services/AddMenu';
import MenuDisplay from '../../Component/displayfood';

interface FoodItem {
  id:string;
  category_id: string;
  provider_id: string;
  menu_id: string;
  food_name: string;
  price: number;
  description: string;
  day: string;
  image?: string;
}

interface Menu {
  id: string;
  category_name: string;
  created_at: string;
  updated_at: string;
  food_items: FoodItem[] | null;
}

const MenuDisplayContainer: React.FC = () => {
  const [menuList, setMenuList] = useState<Menu[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const providerId = localStorage.getItem('id');
        if (!providerId) {
          setError('Provider ID is missing');
          setLoading(false);
          return;
        }
        const menuResponse = await Getcategory();
        const foodResponse = await Getfooditem(providerId);
        setMenuList(menuResponse);
        setFoodItems(foodResponse);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err:any) {
        setError(err.message || 'An error occurred while fetching data.');
        
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleDeleteFoodItem = async (id: string) => {
    await DeleteFoodItems(id);
    setFoodItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  return (
    <MenuDisplay menuList={menuList} foodItems={foodItems} loading={loading} error={error}  onDelete={handleDeleteFoodItem}  />
  );
};

export default MenuDisplayContainer;




