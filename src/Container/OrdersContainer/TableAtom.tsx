import React from "react";
import { StyledTable } from "../../Atoms/Table";
import { Orders } from "../ReviewContainer/types";




interface TableAtomProps {
  data: Orders[];
}

const TableAtom: React.FC<TableAtomProps> = ({ data }) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>User Name</th>
          <th>Address</th>
          <th>City</th>
          <th>Phone number</th>
          <th>Fooditem_Name</th>
         
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.user_name}</td>
            <td>{item.address}</td>
            <td>{item.city}</td>
            <td>{item.ph_no}</td>
            <td>{item.fooditem_name}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default TableAtom;
