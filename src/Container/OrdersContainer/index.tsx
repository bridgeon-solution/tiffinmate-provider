import React, { useEffect, useState } from "react";
import OrderComponent from "../../Component/Orders";
import { Orders } from "../ReviewContainer/types";
import GetAllOrders from "../../Services/Orders";
import { SelectChangeEvent } from "@mui/material";

const OrderContainer: React.FC = () => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(6); 
  const [totalOrder, setTotalOrder] = useState<number>(0);
 const [filter, setFilter] = useState<string | null>(null);
 
  useEffect(() => {
    const fetchOrders = async () => {
      
      setLoading(true);
      setError(null);
      try {
        
        const data = await GetAllOrders(page, search,filter ||"", pageSize,);

        if (data && data.length > 0 && data[0]) {
          setOrders(data[0].allorders || []);
          const totalCount = data[0].totalCount || 0;
          setTotalOrder(totalCount);
          setTotalPages(Math.ceil(totalCount / pageSize));
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
  }, [page, search, pageSize,filter]);

  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

 
  const handleSelectChange = (event: SelectChangeEvent<number | string>) => {
    setPageSize(Number(event.target.value));
  };
  const handleFilterChange = (newFilter: string | null) => {
   
    setFilter(newFilter); 
  
  };
  return (
    <OrderComponent
      totalOrder={totalOrder}
      handleSelectChange={handleSelectChange}
      pageSize={pageSize}
      orders={orders}
      loading={loading}
      error={error}
      totalPages={totalPages}
      setPage={setPage}
      page={page}
      handleSearchChange={handleSearchChange}
      search={search}
      handleFilterChange={handleFilterChange}
      filter={filter}
    />
  );
};

export default OrderContainer;
