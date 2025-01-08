
import { Download as DownloadIcon } from "@mui/icons-material";
import { TextField, Box, Tooltip, IconButton, Typography, SelectChangeEvent, MenuItem, Select } from "@mui/material";

import * as XLSX from "xlsx";
import PaginationRounded from "../../Atoms/Pagination";
import {   Subscriptions } from "../../Container/ReviewContainer/types";
import SubscriptionTable from "../../Container/SubscriptionContainer/SubscriptionTable";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";


interface SubscriptionsComponentProps {
   totalOrder:number;
      handleSelectChange: (e: SelectChangeEvent<number>) => void;
      pageSize:number|"";
    subscriptions: Subscriptions[];
    loading: boolean;
    error: string | null;
   totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    search: string;
    handleFilterChange: (newFilter: string | null) => void;
    filter:string | null;
    toggle: 'true' | 'false';
    handleToggleChange: () => void;
}

const SubscriptionComponent: React.FC<SubscriptionsComponentProps> = ({
  totalOrder,
  handleSelectChange,
  pageSize,
    subscriptions,
  loading,
  error,
  // totalPages,
  setPage,
  // page,
  handleSearchChange,
  search,
  handleFilterChange,
  filter,
  handleToggleChange,
  toggle

}) => {
 
  // if (loading) {
  //   return <CircularProgress />;
  // }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  const exportToExcel = () => {
    
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(subscriptions);
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    // Export the workbook
    XLSX.writeFile(workbook, "Users.xlsx");
  };

  const pageSizeNumber = pageSize || 6; 


  const totalPages = Math.ceil(totalOrder / pageSizeNumber);
  
  return (
  <Box
      sx={{
        padding: "30px",
        backgroundColor: "#F9FAFB",
        borderRadius: 2,
        mt: 4,
      }}
    >
      <h1 style={{ marginBottom: "16px", color: "#e6852c" }}>Subscriptions</h1>
    
      
    
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
     <Box
sx={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px", 
  gap: "16px",
}}
     >
     <button
  onClick={handleToggleChange}
  style={{
    backgroundColor: "#FFFFFF",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100px",
    height: "40px",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "14px",
    color: "#333",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
   
  }}

>
  {toggle === "true" ? "InActive" : "Active"}
</button>

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
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF", 
          borderRadius: "8px", 
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "16px",
        }}
      >
  
  <SubscriptionTable data={subscriptions} loading={loading} />
        
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

export default SubscriptionComponent;
