import React from "react";
import { StyledTable } from "../../Atoms/Table";
import {  Users } from "../ReviewContainer/types";




interface TableAtomProps {
  data: Users[];
}

const UserTable: React.FC<TableAtomProps> = ({ data }) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>User Name</th>
          <th>Address</th>
          <th>City</th>
          <th>Phone number</th>
          <th>Email</th>
         <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.user_name}</td>
            <td>{item.address}</td>
            <td>{item.city}</td>
            <td>{item.ph_no}</td>
            <td>{item.email}</td>
            <td><img src={item.image} alt={`${item.user_name}'s image`}
             style={{
              width: "50px", 
              height: "50px",
              borderRadius: "50%", 
              objectFit: "cover", 
            }}
            /></td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default UserTable;
