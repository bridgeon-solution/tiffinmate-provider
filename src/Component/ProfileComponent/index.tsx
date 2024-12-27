import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Avatar, Divider, Stack } from "@mui/material";

import StyledButton from "../../Atoms/Button";
import GetProfile from "../../Services/Profile";
import { useNavigate } from "react-router-dom";



interface ProviderData {
  username: string;
  email: string;
  address: string;
  phone_no: number;
  verification_status: string;
  image: string;
  created_at: string;
  certificate: string;
}

const ProfileCard: React.FC = () => {
  const [providerData, setProviderData] = useState<ProviderData | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the data
    const fetchData = async () => {
      try {
        const result = await GetProfile();
        setProviderData(result);
      } catch (error) {
        console.error("Error fetching provider data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header Section */}
      <Box display="flex" alignItems="center" p={2} bgcolor="#f7f9fc">
        <Avatar
          alt={providerData?.username || "Profile"}
          src={providerData?.image || "https://via.placeholder.com/80"}
          sx={{ width: 60, height: 60, marginRight: 2 }}
        />
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {providerData?.username || "Loading..."}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {providerData?.email || ""}
          </Typography>
        </Box>
        
        <StyledButton  type="submit" variant="contained" sx={{ marginLeft: "auto" }}  onClick={() => navigate("/edit")}>
                Edit
              </StyledButton>
       
        
      </Box>

      <Divider />

      {/* Personal Information */}
      <Box p={2}>
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          Personal Information:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body2" fontWeight="bold">
              Name:
            </Typography>
            <Typography variant="body2">
              {providerData?.username || "Loading..."}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" fontWeight="bold">
              Email:
            </Typography>
            <Typography variant="body2" color="primary">
              {providerData?.email || ""}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2" fontWeight="bold">
              Phone No:
            </Typography>
            <Typography variant="body2">
              {providerData?.phone_no || ""}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" fontWeight="bold">
              Address:
            </Typography>
            <Typography variant="body2">
              {providerData?.address || ""}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      {/* Account Information */}
      <Box p={2} bgcolor="#f7f9fc">
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          Account Information:
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" fontWeight="bold">
                Verification Status:
              </Typography>
              <Typography
                variant="body2"
                color={
                  providerData?.verification_status === "approved"
                    ? "green"
                    : "error"
                }
              >
                {providerData?.verification_status || ""}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="error">
              Created At:{" "}
              {providerData
                ? new Date(providerData.created_at).toLocaleDateString()
                : ""}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      {/* Certificates Section */}
      <Box p={2}>
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          Certificates
        </Typography>
        {providerData?.certificate ? (
          <Box>
            <img
              src={providerData.certificate}
              alt="Certificate"
              style={{ maxWidth: "100%", height: "50%" }}
            />
          </Box>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No certificates available
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProfileCard;
