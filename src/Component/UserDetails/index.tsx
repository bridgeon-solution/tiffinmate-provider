
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, TextField, Box, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import PaginationRounded from "../../Atoms/Pagination";

interface Order {
    user_name: string;
    address: string;
    city: string;
    ph_no: string;
    fooditem_name: string;
    category_name: string;
    menu_name: string;
    total_price: number;
    start_date: string | null;
    fooditem_image:string
  }
  
  interface OrdersResult {
    totalCount: number;
    allorders: Order[];
  }
  
  interface UserDetailsProps {
    search: string;
    pageSize: number;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectChange: (event: SelectChangeEvent<number | string>) => void;
    orders: OrdersResult | null;
    error: string | null;
    loading: boolean;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalOrder: number;
    totalPages: number;
  }
  
  const UserDetails: React.FC<UserDetailsProps> = ({
search,
pageSize,
    handleSearch,
    handleSelectChange,
    orders,
    error,
    loading,
    setPage,
    totalOrder,
    totalPages,
  }) => {
    if (error) {
      return <Typography color="error">{error}</Typography>;
    }


 
  return (
    <Box sx={{ marginTop: "5rem" }}>
        <TextField
        label="Search"
        variant="outlined"
        value={search}
        onChange={handleSearch}
        style={{ marginBottom: "1rem" }}
      />
       <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>User Name</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>City</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Food Item</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Menu</TableCell>
          <TableCell>Total Price</TableCell>
          <TableCell>Food Image</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : orders && orders.allorders.length > 0 ? (
              orders.allorders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.user_name}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.city}</TableCell>
                  <TableCell>{order.ph_no}</TableCell>
                  <TableCell>{order.fooditem_name}</TableCell>
                  <TableCell>{order.category_name}</TableCell>
                  <TableCell>{order.menu_name}</TableCell>
                  <TableCell>{order.total_price}</TableCell>
                  <TableCell><img src={order.fooditem_image} alt={`${order.user_name}'s image`}
             style={{
              width: "50px", 
              height: "50px",
              borderRadius: "50%", 
              objectFit: "cover", 
            }}
            /></TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
    </Table>
  </TableContainer>

  <Box display="flex" gap={4} alignItems="center" mt={2}>
    {/* pagination */}
        <PaginationRounded totalPages={totalPages} onPageChange={setPage} />
        <Box display="flex" alignItems="center" gap={1}>
          <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>Show:</Typography>
          <Select
            value={pageSize}
            onChange={handleSelectChange}
            displayEmpty
            sx={{
              width: "150px",
              height: "35px",
              backgroundColor: "#f9f9f9",
              border: "1px solid #ccc",
              borderRadius: "8px",
              textAlign: "center",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            <MenuItem value="" disabled>
              Select Rows
            </MenuItem>
            {Array.from({ length: totalOrder }, (_, index) => (
              <MenuItem key={index} value={index + 1}>
                {index + 1} rows
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
  </Box>
   
  )
}

export default UserDetails



