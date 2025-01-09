import React, { useEffect, useState } from "react";



import GetAllUsers from "../../Services/Users";
import { Users } from "../ReviewContainer/types";
import UsersComponent from "../../Component/Users";
import { SelectChangeEvent } from "@mui/material";



const UsersContainer: React.FC = () => {

const [orders,setOrders]=useState<Users[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
   const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState<number>(6); 
  const [totalOrder, setTotalOrder] = useState<number>(0);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await GetAllUsers(page, search , pageSize|| ""); 
       

        if (data && data.length > 0 && data[0]) {
          setOrders(data[0].allUsers || []);
          const totalCount = data[0]?.totalCount || 0;
          setTotalOrder(totalCount);
          setTotalPages(Math.ceil(totalCount / 6)); 
         
          
        } else {
          setOrders([]);
          setTotalPages(0);
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page,search,pageSize]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    
  
    
  };
 const handleSelectChange = (event: SelectChangeEvent<number | string>) => {
    setPageSize(Number(event.target.value));
  };
  return (
    <UsersComponent
    totalOrder={totalOrder}
    handleSelectChange={handleSelectChange}
      pageSize={pageSize}
    users={orders}
    loading={loading}
    error={error}
    totalPages={totalPages}
      setPage={setPage}
      page={page}
      handleSearchChange={handleSearchChange}
      search={search}
    />
  );
};

export default UsersContainer;
