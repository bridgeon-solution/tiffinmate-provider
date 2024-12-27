import React from "react";
import {
  Card,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Avatar,
  TextField,
} from "@mui/material";
import PaginationRounded from "../../Atoms/Pagination";

// types.ts
export interface Review {
  id: string;
  username: string;
  review: string;
  image?: string;
  created_at?: string;
}

interface ReviewsComponentProps {
  reviews: Review[];
  loading: boolean;
  error: string | null;
  sortOrder: "newest" | "oldest";
  handleSortToggle: () => void;
  handleFilterChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
  filter: "true" | "false";
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
}

const ReviewsComponent: React.FC<ReviewsComponentProps> = ({
  reviews,
  loading,
  error,
  handleFilterChange,
  filter,
  totalPages,
  setPage,
  handleSearchChange,
  search,
}) => {
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  console.log(reviews);

  let totalPage = 0;
  if (totalPages % 6 === 0) {
    totalPage = totalPages / 6;
  } else {
    totalPage = Math.ceil(totalPages / 6);
  }

  return (
    <Box padding={3}>
      {/* Customer Reviews Section */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "left",
          marginBottom: 1,
          marginTop: 3, // Added mt
          color: "#e6852c", // Updated color
        }}
      >
        Customer Reviews
      </Typography>

      {/* Grid container for search bar and sorting dropdown */}
      <Grid container spacing={3} justifyContent="space-between" sx={{ marginBottom: 3 }}>
        {/* Search Bar */}
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            label="Search Reviews"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            fullWidth
            sx={{
              maxWidth: 300,
              borderRadius: "20px",
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
              },
            }}
          />
        </Grid>

        {/* Sorting Dropdown */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            label="Sort by created_at"
            value={filter}
            onChange={handleFilterChange}
            SelectProps={{
              native: true,
            }}
            sx={{
              width: "100%",
              borderRadius: "20px",
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
              },
            }}
          >
            <option value="true">Newest</option>
            <option value="false">Oldest</option>
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {reviews?.map((review) => (
          <Grid item xs={12} sm={6} md={4} key={review.id}>
            <Card
              sx={{
                maxWidth: 350,
                boxShadow: 3,
                borderRadius: 2,
                padding: 2,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={review.image}
                  alt={`${review.username}'s avatar`}
                  sx={{
                    width: 80,
                    height: 80,
                    marginRight: 2,
                    border: "2px solid #ddd",
                  }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {review.username}
                  </Typography>
                  {review.created_at && (
                    <Typography variant="body2" color="text.secondary">
                      {new Date(review.created_at).toLocaleDateString()}
                    </Typography>
                  )}
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    "{review.review}"
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Section */}
      <Box mt={3}> {/* Added mt */}
        <PaginationRounded totalPages={totalPage} onPageChange={setPage} />
      </Box>
    </Box>
  );
};

export default ReviewsComponent;
