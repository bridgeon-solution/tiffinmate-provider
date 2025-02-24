import React, { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import GetAllPayments from "../../Services/Payment/paymentHistory";
import PaymentComponent from "../../Component/PaymentComponent";
import { Payment } from "../ReviewContainer/types";

const PaymentContainer: React.FC = () => {
  const [orders, setOrders] = useState<Payment[]>([]);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(6);
  const [totalOrder, setTotalOrder] = useState<number>(0);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await GetAllPayments(page, search,  pageSize,);
        
        
        if (data && data.length > 0 && data[0]) {
          setOrders(data[0].paymentHistory || []);
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
  }, [page, search, pageSize]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSelectChange = (event: SelectChangeEvent<number | string>) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <PaymentComponent
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
    />
  );
};

export default PaymentContainer;
