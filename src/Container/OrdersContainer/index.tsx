import React, { useEffect, useState } from "react";
import SubscriptionsComponent from "../../Component/Orders";
import { Orders } from "../ReviewContainer/types";
import GetAllOrders from "../../Services/Orders";



const SubscriptionsContainer: React.FC = () => {

const [orders,setOrders]=useState<Orders[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
   const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await GetAllOrders(page, search || ""); 
        
        if (data && data.length > 0 && data[0]) {
          setOrders(data[0].allorders || []);
          const totalCount = data[0].totalCount || 0;
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
  }, [page,search]);

 const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 
    setSearch(e.target.value);
   
    
  };
  

  return (
    <SubscriptionsComponent
    orders={orders}
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

export default SubscriptionsContainer;
