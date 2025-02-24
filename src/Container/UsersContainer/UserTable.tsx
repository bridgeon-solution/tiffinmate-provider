import React, { useState } from "react";

import {  Users,Orders,Payment } from "../ReviewContainer/types";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Modal,
  Box,
  Typography,
} from "@mui/material";
interface TableAtomProps {
  data: Users[];
  loading:boolean
}


const UserTable: React.FC<TableAtomProps> = ({ data,loading }) => {
  const navigate=useNavigate();
  
  const handleClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const [open, setOpen] = useState(false);

  const handleClicked = (user: Users) => {
    setSelectedUser(user);
    setOpen(true);
  };
  return (

    <>
       <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
        <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
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
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <img
                    src={item.image}
                    alt={`${item.user_name}'s avatar`}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                    onClick={() => handleClick(item.user_id)}
                  />
                </TableCell>
                <TableCell>
                    <IconButton  color="primary" onClick={() => handleClicked(item)}>
                      <Visibility />
                    </IconButton>
                  </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
          </Table>
       </TableContainer>
       <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
          Subscription Details & Payment History
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            <strong>Name:</strong> {selectedUser?.user_name}
          </Typography>
          <Typography variant="body2">
            <strong>Phone:</strong> {selectedUser?.ph_no || "N/A"}
          </Typography>
          <Typography variant="body2">
            <strong>Email:</strong> {selectedUser?.email || "N/A"}
          </Typography>

        
          <Typography variant="h6" sx={{ mt: 2 }}>
            Subscriptions:
          </Typography>
          {selectedUser?.order?.length ? (
            selectedUser.order.map((order: Orders, idx: number) => (
              <Box key={idx} sx={{ mb: 2, p: 2, border: "1px solid #ddd", borderRadius: 1 }}>
                <Typography variant="body2"><strong>Food:</strong> {order.fooditem_name}</Typography>
                <Typography variant="body2"><strong>Category:</strong> {order.category_name}</Typography>
                <Typography variant="body2"><strong>Menu:</strong> {order.menu_name}</Typography>
                <Typography variant="body2"><strong>Price:</strong> ${order.total_price}</Typography>
                <Typography variant="body2"><strong>Start Date:</strong> {order.start_date}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2">No orders found.</Typography>
          )}

        
          <Typography variant="h6" sx={{ mt: 2 }}>
            Payment History:
          </Typography>
          {selectedUser?.payment_history?.length ? (
            selectedUser.payment_history.map((payment: Payment, idx: number) => (
              <Box key={idx} sx={{ mb: 2, p: 2, border: "1px solid #ddd", borderRadius: 1 }}>
                <Typography variant="body2"><strong>Amount:</strong> ${payment.amount}</Typography>
                <Typography variant="body2"><strong>Payment Date:</strong> {payment.payment_date || "N/A"}</Typography>
                <Typography variant="body2"><strong>Paid:</strong> {payment.is_paid ? "Yes" : "No"}</Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2">No payment history found.</Typography>
          )}
        </Box>
      </Modal>
       </>
      
  );
};

export default UserTable;
