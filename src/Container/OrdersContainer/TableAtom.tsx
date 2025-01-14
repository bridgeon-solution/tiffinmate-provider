import React from "react";

import { Orders } from "../ReviewContainer/types";
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";




interface TableAtomProps {
  data: Orders[];
  loading:boolean;
}

const TableAtom: React.FC<TableAtomProps> = ({ data,loading }) => {
  return (
  
       <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
       <Table sx={{ minWidth: 650 }}>
       <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Phone number</TableCell>
            <TableCell>Fooditem Name</TableCell>
            <TableCell>Category Name</TableCell>
            <TableCell>Menu Name</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={9} align="center">
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
              </TableRow>
            ))
          )}
        </TableBody>
 </Table>
 </TableContainer>
      

      
  );
};

export default TableAtom;
