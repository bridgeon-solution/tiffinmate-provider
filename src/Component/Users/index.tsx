import React from "react";
import { Download as DownloadIcon } from "@mui/icons-material";
import { TextField, Box, Tooltip, IconButton, Typography, SelectChangeEvent, Select, MenuItem } from "@mui/material";

import * as XLSX from "xlsx";
import PaginationRounded from "../../Atoms/Pagination";
import {  Users } from "../../Container/ReviewContainer/types";
import UserTable from "../../Container/UsersContainer/UserTable";



interface SubscriptionsComponentProps {
  totalOrder:number;
    handleSelectChange: (e: SelectChangeEvent<number>) => void;
    pageSize:number|"";
    users: Users[];
    loading: boolean;
    error: string | null;
   totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    search: string;
}

const UsersComponent: React.FC<SubscriptionsComponentProps> = ({
  users,
  loading,
  error,
  setPage,
  handleSearchChange,
  search,
  handleSelectChange,
  pageSize,
  totalOrder,
  // page,
}) => {
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(users);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "Users.xlsx");
  };


console.log("Users Array:", users); 


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
      <h1 style={{ marginBottom: "16px", color: "#e6852c" }}>Users</h1>

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
        <UserTable data={users} loading={loading} />
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

export default UsersComponent;


