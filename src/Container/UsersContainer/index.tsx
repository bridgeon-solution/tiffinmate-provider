import React, { useEffect, useState } from "react";



import GetAllUsers from "../../Services/Users";
import { Users } from "../ReviewContainer/types";
import UsersComponent from "../../Component/Users";



const UsersContainer: React.FC = () => {

const [orders,setOrders]=useState<Users[]>([]);
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
        const data = await GetAllUsers(page, search || ""); 
       

        if (data && data.length > 0 && data[0]) {
          setOrders(data[0].allUsers || []);
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
    setPage(1); 
  };

  return (
    <UsersComponent
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
