import React from "react";

import { Payment } from "../ReviewContainer/types";
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";




interface TableAtomProps {
  data: Payment[];
  loading:boolean;
}

const PaymentTable: React.FC<TableAtomProps> = ({ data,loading }) => {
  return (
  
       <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
       <Table sx={{ minWidth: 650 }}>
       <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Payment_date</TableCell>
            <TableCell>is_paid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {loading ? (
    <TableRow>
      <TableCell colSpan={4} align="center">
        <CircularProgress />
      </TableCell>
    </TableRow>
  ) : data.length === 0 ? (
    <TableRow>
      <TableCell colSpan={4} align="center">
        No Payment History Found
      </TableCell>
    </TableRow>
  ) : (
    data.map((item, index) => (
      <TableRow key={index}>
        <TableCell>{item.user_name}</TableCell>
        <TableCell>{item.amount}</TableCell>
        <TableCell>{item.payment_date?.slice(0, 10)}</TableCell>
        <TableCell>{item.is_paid ? "Yes" : "No"}</TableCell>
      </TableRow>
    ))
  )}
</TableBody>


 </Table>
 </TableContainer>
      
     
      
  );
};

export default PaymentTable;
