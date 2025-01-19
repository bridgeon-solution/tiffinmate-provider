import React from "react";
import { Download as DownloadIcon } from "@mui/icons-material";
import { TextField, Box, Tooltip, IconButton, Typography, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import TableAtom from "../../Container/OrdersContainer/TableAtom";
import * as XLSX from "xlsx";
import PaginationRounded from "../../Atoms/Pagination";
import {  Orders } from "../../Container/ReviewContainer/types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";


interface SubscriptionsComponentProps {
  totalOrder:number;
  handleSelectChange: (e: SelectChangeEvent<number>) => void;
  pageSize:number|"";
  orders: Orders[];
    loading: boolean;
    error: string | null;
   totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    search: string;
    handleFilterChange: (newFilter: string | null) => void;
    filter:string | null
}

const OrderComponent: React.FC<SubscriptionsComponentProps> = ({
  orders,
  loading,
  error,
  totalPages,
  setPage,
  // page,
  handleSearchChange,
  search,
  handleSelectChange,
  pageSize,
  totalOrder,
  handleFilterChange,
  filter
}) => {


  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  const exportToExcel = () => {
    
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(orders);
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    // Export the workbook
    XLSX.writeFile(workbook, "Orders.xlsx");
  };

 
  return (
    <Box
    sx={{
      padding: "30px",
      backgroundColor: "#F9FAFB",
      borderRadius: 2,
      mt: 4,
    }}
  >
    <h1 style={{ marginBottom: "16px", color: "#e6852c" }}>Orders</h1>
  
    
  
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px", 
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
      <Tooltip title="Download">
        <IconButton sx={{ color: "#e6852c" }} onClick={exportToExcel}>
          <DownloadIcon />
        </IconButton>
      </Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        sx={{
          width: "300px",
          marginLeft: "16px", 
        }}
        value={search}
        onChange={handleSearchChange}
      />
    </Box>
  
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select Date"
          value={filter ? new Date(filter) : null}
          onChange={(newDate: Date | null) => {
            const formattedDate = newDate ? format(newDate, "yyyy-MM-dd") : null;
            handleFilterChange(formattedDate as never);
          }}
          slotProps={{
            textField: {
              size: "small",
              sx: {
                width: "200px",
                backgroundColor: "#FFFFFF",
                borderRadius: "4px",
              },
            },
          }}
        />
      </LocalizationProvider>
    </Box>
  
      <Box
        
      >
        <TableAtom data={orders} loading={loading} />
        
      </Box>
 {/* Pagination */}
 
 <Box display="flex" gap={4} alignItems="center" mt={2}>
        <PaginationRounded totalPages={totalPages} onPageChange={setPage} />
        <Box display="flex" alignItems="center" gap={1}>
          <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>Show:</Typography>
          <Select
            value={pageSize}
            onChange={handleSelectChange}
            displayEmpty
            sx={{
              width: "150px",
              height: "35px",
              backgroundColor: "#f9f9f9",
              border: "1px solid #ccc",
              borderRadius: "8px",
              textAlign: "center",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            <MenuItem value="" disabled>
              Select Rows
            </MenuItem>
            {Array.from({ length: totalOrder }, (_, index) => (
              <MenuItem key={index} value={index + 1}>
                {index + 1} rows
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderComponent;
