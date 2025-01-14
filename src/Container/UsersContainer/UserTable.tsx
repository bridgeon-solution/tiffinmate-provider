import React from "react";

import {  Users } from "../ReviewContainer/types";

import { useNavigate } from "react-router-dom";
import { CircularProgress, Paper, TableContainer, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
interface TableAtomProps {
  data: Users[];
  loading:boolean
}


const UserTable: React.FC<TableAtomProps> = ({ data,loading }) => {
  const navigate=useNavigate();
  
  const handleClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  return (
    
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
              </TableRow>
            ))
          )}
        </TableBody>
          </Table>
       </TableContainer>
      
  );
};

export default UserTable;
