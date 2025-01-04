import React, { useEffect, useState } from 'react'; 
import {GetMenu} from '../../Services/AddMenu/index';
import Displaymenu from '../../Component/DisplayMenu';

interface Menu {
  id: string; 
  name: string; 
  image:File | null;
  description: string;
  monthly_plan_amount: number;
}

const DisplayMenuDetails: React.FC = () => {
  const [MenuList, setMenuList] = useState<Menu[]>([]);
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
        const menuData = await GetMenu(providerId);
        
       
        setMenuList(menuData|| []);
       
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch menu or food items. Please try again later.');
        setLoading(false);
      }
    };
    fetchMenuData();
  }, []);

  return (
    <Displaymenu
      menuList={MenuList}
      loading={Loading}
      error={Error}
    />
  );
};

export default DisplayMenuDetails;
