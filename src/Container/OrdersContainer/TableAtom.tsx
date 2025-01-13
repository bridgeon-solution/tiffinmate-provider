import React from "react";
import { StyledTable } from "../../Atoms/Table";
import { Orders } from "../ReviewContainer/types";
import { CircularProgress } from "@mui/material";




interface TableAtomProps {
  data: Orders[];
  loading:boolean;
}

const TableAtom: React.FC<TableAtomProps> = ({ data,loading }) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>User Name</th>
          <th>Address</th>
          <th>City</th>
          <th>Phone number</th>
          <th>Fooditem_Name</th>
          <th>Category_Name</th> 
          <th>Menu_Name</th> 
          <th>Total_Price</th> 
          <th>Date</th> 
        </tr>
      </thead>
      <tbody>


        {
         loading ? <CircularProgress /> :
        data.map((item, index) => (
          <tr key={index}>
            <td>{item.user_name}</td>
            <td>{item.address}</td>
            <td>{item.city}</td>
            <td>{item.ph_no}</td>
            <td>{item.fooditem_name}</td>
            <td>{item.category_name}</td>
            <td>{item.menu_name}</td>
            <td>{item.total_price}</td>
            <td>{item.start_date?.slice(0,10)}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default TableAtom;