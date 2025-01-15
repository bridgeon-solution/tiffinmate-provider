import React from "react";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Subscriptions } from "../ReviewContainer/types";

interface TableAtomProps {
  data: Subscriptions[];
  loading: boolean;
}

const SubscriptionTable: React.FC<TableAtomProps> = ({ data, loading }) => {
  

  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Phone number</TableCell>
            <TableCell>Fooditem</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Menu</TableCell>
            <TableCell>Total_Price</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>is_Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={10} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.user_name}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.ph_no}</TableCell>
                <TableCell>{item.fooditem_name}</TableCell>
                <TableCell>{item.category_name}</TableCell>
                <TableCell>{item.menu_name}</TableCell>
                <TableCell>{item.total_price}</TableCell>
                <TableCell>{item.start_date?.slice(0, 10)}</TableCell>
                <TableCell style={{ color: item.is_active ? "blue" : "red" }}>
                  {item.is_active ? "Active" : "Inactive"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SubscriptionTable;
