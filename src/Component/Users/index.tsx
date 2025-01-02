import React from "react";
import { Download as DownloadIcon } from "@mui/icons-material";
import { TextField, Box, Tooltip, IconButton } from "@mui/material";
import TableAtom from "../../Container/UsersContainer/TableAtom";
import * as XLSX from "xlsx";
import PaginationRounded from "../../Atoms/Pagination";

interface Subscription {
  customerName: string;
  userId: number;
  email: string;
  startDate: string;
  endDate: string;
  planType: string;
  status: string;
}

interface SubscriptionsComponentProps {
  data: Subscription[];
  searchQuery: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const SubscriptionsComponent: React.FC<SubscriptionsComponentProps> = ({
  data,
  searchQuery,
  onSearch,
  totalPages,
  
  onPageChange,
  
}) => {
  const exportToExcel = () => {
    
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    // Export the workbook
    XLSX.writeFile(workbook, "Users.xlsx");
  };

  return (
    <Box sx={{ padding: "24px", backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "16px" }}>Users</h1>
{/* //download */}
<Tooltip title="Download">
  <IconButton color="primary" onClick={exportToExcel}>
    <DownloadIcon/>
  </IconButton>
</Tooltip>



      {/* Search Input */}
      <TextField
        label="Search"
        variant="outlined"
        size="small" 
        sx={{
          marginBottom: "16px",
          width: "300px", 
        }}
        value={searchQuery}
        onChange={onSearch}
      />

      {/* Table */}
      <Box
        sx={{
          backgroundColor: "#FFFFFF", 
          borderRadius: "8px", 
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "16px",
        }}
      >
        <TableAtom data={data} />
      </Box>
 {/* Pagination Section */}
 <Box mt={3}> 
 <PaginationRounded
  totalPages={totalPages}
  onPageChange={(page: number) => onPageChange( page)}
/>

      </Box>
     
    </Box>
  );
};

export default SubscriptionsComponent;
