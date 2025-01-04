import React from "react";
import { Download as DownloadIcon } from "@mui/icons-material";
import { TextField, Box, Tooltip, IconButton, CircularProgress, Typography } from "@mui/material";
import TableAtom from "../../Container/OrdersContainer/TableAtom";
import * as XLSX from "xlsx";
import PaginationRounded from "../../Atoms/Pagination";
import {  Orders } from "../../Container/ReviewContainer/types";



interface SubscriptionsComponentProps {
  orders: Orders[];
    loading: boolean;
    error: string | null;
   totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    search: string;
}

const SubscriptionsComponent: React.FC<SubscriptionsComponentProps> = ({
  orders,
  loading,
  error,
  totalPages,
  setPage,
  // page,
  handleSearchChange,
  search
}) => {
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  const exportToExcel = () => {
    
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(orders);
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    // Export the workbook
    XLSX.writeFile(workbook, "Users.xlsx");
  };

  let totalPage = 0;
  if (totalPages % 6 === 0) {
    totalPage = totalPages / 6;
  } else {
    totalPage = Math.ceil(totalPages / 6);
  }
  
  return (
  <Box
                 sx={{
                     padding: "30px",
                     backgroundColor: "#F9FAFB",
                   borderRadius: 2,
                   mt: 4,
                 }}
               >
      <h1 style={{ marginBottom: "16px" }}>Orders</h1>

<Tooltip title="Download">
  <IconButton color="primary" onClick={exportToExcel}>
    <DownloadIcon/>
  </IconButton>
</Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small" 
        sx={{
          marginBottom: "16px",
          width: "300px", 
        }}
        value={search}
        onChange={handleSearchChange}
      />
      <Box
        sx={{
          backgroundColor: "#FFFFFF", 
          borderRadius: "8px", 
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "16px",
        }}
      >
        <TableAtom data={orders} />
        
      </Box>
 {/* Pagination */}
 <Box mt={3}> 
 <PaginationRounded totalPages={totalPage} onPageChange={setPage} />

      </Box>
     
    </Box>
  );
};

export default SubscriptionsComponent;
