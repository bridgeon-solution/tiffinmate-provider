import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetUserDetails from "../../Services/UserDetails";

import UserDetails from "../../Component/UserDetails";
import { SelectChangeEvent } from "@mui/material";

interface Order {
  user_name: string;
  address: string;
  city: string;
  ph_no: string;
  fooditem_name: string;
  category_name: string;
  menu_name: string;
  total_price: number;
  start_date: string | null;
  fooditem_image: string;
}

interface OrdersResult {
  totalCount: number;
  allorders: Order[];
}

const UserDetailsContainer: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [orders, setOrders] = useState<OrdersResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
   const [search, setSearch] = useState<string>("");
   const [page, setPage] = useState<number>(1);
   const [pageSize, setPageSize] = useState<number>(5);
   const [totalOrder, setTotalOrder] = useState<number>(0);
   const [totalPages, setTotalPages] = useState(0);
useEffect(()=>{
    const fetchDetails=async()=>{
        try{
            if(!userId){
                setError("UseId is missing in URL");
                return;
            }
            const data= await GetUserDetails(page,search,pageSize,userId)
            setOrders(data[0])
            const orders=data[0].totalCount;
            setTotalOrder(orders);
            setTotalPages(Math.ceil(orders / 4));
        }catch(err){
            setError((err as Error).message);
        }finally{
            setLoading(false);
        }
    };
    fetchDetails();
},[userId,search,page,pageSize]);

const handleSelectChange = (event: SelectChangeEvent<number | string>) => {
    setPageSize(Number(event.target.value));
  };
const handleSearch=(e: React.ChangeEvent<HTMLInputElement>)=>{
  setSearch(e.target.value);
}


 
  return (
    <UserDetails
    search={search}
    pageSize={pageSize}
     handleSearch={handleSearch}
     handleSelectChange={handleSelectChange}
     orders={orders}
     error={error}
     loading={loading}
     setPage={setPage}
     totalOrder={totalOrder}
     totalPages={totalPages}
    />
  );
};

export default UserDetailsContainer;
