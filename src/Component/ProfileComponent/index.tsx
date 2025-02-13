import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  CircularProgress,
  Stack,
  Button,
  Modal,
} from "@mui/material";
import GetProfile from "../../Services/Profile";
// import EditProviderFormComponent from "./EditProviderFormComponent";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EditProviderFormComponent from "../EditProfileComponent";
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
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    window.confirm("Are you Sure");
    navigate('/login');
   localStorage.clear();
    toast.success("Logged out successfully!");
  };
const handleLogin=()=>{
  navigate('/login')
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetProfile();
        console.log(result);
        
        setProviderData(result);
      } catch (error) {
        toast.error("Error fetching provider data: " + error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress size={50} />
      </Box>
    );
  }
const id=localStorage.getItem('id');
  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: 4,
        typography: "body1",
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
        mt: 4,
      }}
    >
      
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
      <Stack direction="row" spacing={3} alignItems="center">
        <Avatar
          alt={providerData?.username || "Profile"}
          src={providerData?.image || "https://via.placeholder.com/100"}
          sx={{
            width: 120,
            height: 120,
            border: "3px solid #e6852c",
          }}
        />
        <Box>
          <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
            {providerData?.username || "Loading..."}
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={2}>
            {providerData?.email || "N/A"}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              textTransform: "none",
              backgroundColor: "#e6852c",
              "&:hover": {
                backgroundColor: "#b8621b",
              },
            }}
            onClick={handleModalOpen}
          >
            Edit Profile
          </Button>
        </Box>
        </Stack>
        {id?( <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{
            textTransform: "none",
            backgroundColor: "#d32f2f",
            "&:hover": {
              backgroundColor: "#9a0007",
            },
          }}
        >
          Logout
        </Button>):( <Button
          variant="contained"
          color="error"
          onClick={handleLogin}
          sx={{
            textTransform: "none",
            backgroundColor: "#d32f2f",
            "&:hover": {
              backgroundColor: "#9a0007",
            },
          }}
        >
          LogIn
        </Button>)}
      </Stack>
      <Typography variant="h5" fontWeight="bold" color="text.primary" mb={2}>
        Personal Information
      </Typography>
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" fontWeight="bold" color="text.secondary">
            Name:
          </Typography>
          <Typography variant="body1">{providerData?.username || "N/A"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" fontWeight="bold" color="text.secondary">
            Email:
          </Typography>
          <Typography variant="body1">{providerData?.email || "N/A"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" fontWeight="bold" color="text.secondary">
            Phone No:
          </Typography>
          <Typography variant="body1">{providerData?.phone_no || "N/A"}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" fontWeight="bold" color="text.secondary">
            Address:
          </Typography>
          <Typography variant="body1">{providerData?.address || "N/A"}</Typography>
        </Grid>
      </Grid>
      <Typography variant="h5" fontWeight="bold" color="text.primary" mb={2}>
        Account Information
      </Typography>
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" fontWeight="bold" color="text.secondary">
            Verification Status:
          </Typography>
          <Typography
            variant="body1"
            color={providerData?.verification_status === "approved" ? "success.main" : "error.main"}
          >
            {providerData?.verification_status || "N/A"}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" fontWeight="bold" color="text.secondary">
            Created At:
          </Typography>
          <Typography variant="body1">
            {providerData ? new Date(providerData.created_at).toLocaleDateString() : "N/A"}
          </Typography>
        </Grid>
      </Grid>
      {/* Certificates */}
      <Typography variant="h5" fontWeight="bold" color="text.primary" mb={2}>
        Certificates
      </Typography>
      {providerData?.certificate ? (
        <Box
          sx={{
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <img
            src={providerData.certificate}
            alt="Certificate"
            style={{
              maxWidth: "100%",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No certificates available
        </Typography>
      )}

      {/* Modal for Edit Profile */}
      <Modal
  open={isModalOpen}
  onClose={handleModalClose}
  sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
>
  <Box
    sx={{
      backgroundColor: "white",
      p: 4,
      borderRadius: 2,
      boxShadow: 24,
      width: "90%",
      maxWidth: 600,
      mt: 4, 
      mb: 4, 
    }}
  >
    <EditProviderFormComponent handleModalClose={handleModalClose}  />
  </Box>
</Modal>

    </Box>
  );
};

export default ProfileCard;
