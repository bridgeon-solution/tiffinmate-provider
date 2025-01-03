import React, { useState } from "react";
import SubscriptionsComponent from "../../Component/Users";


interface Subscription {
  customerName: string;
  userId: number;
  email: string;
  startDate: string;
  endDate: string;
  planType: string;
  status: string;
}

const SubscriptionsContainer: React.FC = () => {
  const [data] = useState<Subscription[]>([
    { customerName: "Jane Cooper", userId: 101, email: "email1@gmail.com", startDate: "01/01/2023", endDate: "01/01/2024", planType: "Yearly", status: "Expired" },
    { customerName: "Ronald Richards", userId: 202, email: "email2@gmail.com", startDate: "01/03/2023", endDate: "01/03/2024", planType: "Monthly", status: "Active" },
    { customerName: "Michael Scott", userId: 303, email: "email3@gmail.com", startDate: "01/05/2023", endDate: "01/05/2024", planType: "Premium", status: "Expired" },
    { customerName: "Pam Beesly", userId: 404, email: "email4@gmail.com", startDate: "01/07/2023", endDate: "01/07/2024", planType: "Non-Veg", status: "Active" },
  ]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

 const filteredData=data.filter((item)=>
    item.customerName.toLowerCase().includes(searchQuery.toLowerCase())||
 item.email.toLowerCase().includes(searchQuery.toLowerCase())||
 item.planType.toLowerCase().includes(searchQuery.toLowerCase())||
 item.status.toLowerCase().includes(searchQuery.toLowerCase())
)

const paginatedData=filteredData.slice((currentPage-1)* itemsPerPage,currentPage*itemsPerPage)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  

  return (
    <SubscriptionsComponent
      data={paginatedData}
      searchQuery={searchQuery}
      onSearch={handleSearch}
      totalPages={Math.ceil(filteredData.length / itemsPerPage)}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  );
};

export default SubscriptionsContainer;
