import React, { useEffect, useState } from "react";
import { Subscriptions } from "../ReviewContainer/types";
import GetAllSubscription from "../../Services/Subscription";
import SubscriptionComponent from "../../Component/SubscriptionComponent";
import { SelectChangeEvent } from "@mui/material";

const SubscriptionContainer: React.FC = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [orders, setOrders] = useState<Subscriptions[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState(0);
const [pageSize, setPageSize] = useState<number>(6); 
  const [totalOrder, setTotalOrder] = useState<number>(0);
   const [toggle, setToggle] = useState<'true' | 'false'>('true');
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await GetAllSubscription(page, search, filter || "", pageSize|| "",toggle ); 
        
        if (data && data.length > 0 && data[0]) {
          setOrders(data[0].allsubscription || []);
          const totalCount = data[0].totalCount || 0;
          
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
  }, [page, filter,pageSize,search,toggle]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log("Search query: ", e.target.value);
    console.log("Current filter: ", filter); 
  };

  const handleFilterChange = (newFilter: string | null) => {
    console.log("Setting filter: ", newFilter); 
    setFilter(newFilter); 
  
  };
const handleSelectChange = (event: SelectChangeEvent<number | string>) => {
    setPageSize(Number(event.target.value));
  };
  const handleToggleChange=()=>{
    setToggle((preToggle)=>preToggle==='true'? 'false' : 'true');
  }
  return (
    <SubscriptionComponent
    totalOrder={totalOrder}
    handleSelectChange={handleSelectChange}
      pageSize={pageSize}
      subscriptions={orders}
      loading={loading}
      error={error}
      totalPages={totalPages}
      setPage={setPage}
      page={page}
      handleSearchChange={handleSearchChange}
      search={search}
      handleFilterChange={handleFilterChange}
      filter={filter}
      toggle={toggle} 
      handleToggleChange={handleToggleChange}
    />
  );
};

export default SubscriptionContainer;
