import React from "react";
import { StyledTable } from "../../Atoms/Table";


interface Subscription {
  customerName: string;
  userId: number;
  email: string;
  startDate: string;
  endDate: string;
  planType: string;
  status: string;
}

interface TableAtomProps {
  data: Subscription[];
}

const TableAtom: React.FC<TableAtomProps> = ({ data }) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>User ID</th>
          <th>Email</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Plan Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.customerName}</td>
            <td>{item.userId}</td>
            <td>{item.email}</td>
            <td>{item.startDate}</td>
            <td>{item.endDate}</td>
            <td>{item.planType}</td>
            <td style={{ color: item.status === "Active" ? "green" : "red" }}>
              {item.status}
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default TableAtom;
