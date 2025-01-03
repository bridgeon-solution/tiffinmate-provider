import React, { useEffect, useState } from "react";
import GetProfile from "../../Services/Profile";
import UpdateProfile from "../../Services/EditProfile";
import { Box, TextField, Typography, Avatar, FormControl, Input, FormHelperText, IconButton } from "@mui/material";
import StyledButton from "../../Atoms/Button";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import CloseIcon from "@mui/icons-material/Close";
interface ProviderData {
    username: string;
    email: string;
    address: string;
    phone_no: number;
    logo: string;
}
interface EditProviderFormProps {
    handleModalClose: () => void;
  }
  const EditProviderFormComponent: React.FC<EditProviderFormProps> = ({ handleModalClose }) => {
    const [providerData, setProviderData] = useState<ProviderData>({
        username: "",
        email: "",
        address: "",
        phone_no: 0,
        logo: "",
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetProfile();
                console.log(result);
                if (result) {
                    setProviderData({
                        username: result.username || '',
                        email: result.email || '',
                        address: result.address || '',
                        phone_no: result.phone_no || 0,
                        logo: result.image || '',
                    });
                }
            } catch (error) {
                toast.error("Error fetching provider data"+ error);
                
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProviderData((prevData) => ({
            ...prevData,
            [name]: name === "phone_no" ? value : value, 
        }));
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setLogoPreview(URL.createObjectURL(file)); 
        }
    };
    
    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
          if (!validateEmail(providerData.email)) {
            toast.error("Please enter a valid email address with '@'.");
            setLoading(false);
            return;
        }
        const formData = new FormData();
        const providerId = localStorage.getItem('id');
    
        if (providerId) {
            formData.append("provider_id", providerId);
        } else {
           
            toast.warning("Provider ID is missing. Please log in again.");
            setLoading(false);
            return;
        }
    
        formData.append("username", providerData.username);
        formData.append("email", providerData.email);
        formData.append("address", providerData.address);
        formData.append("phone_no", providerData.phone_no.toString());
    
        if (selectedFile) {
            formData.append("logo", selectedFile);
        }
    
        try {
            await UpdateProfile(formData);
             toast.success("Profile updated successfully!");
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response && error.response.data) {
                const validationError = error.response.data.errors;
                const errorMessages = Object.values(validationError).flat().join(", ");
                toast.error(errorMessages);
            } else {
                toast.error("An unknown error occurred.");
            }
        }finally {
            setLoading(false);
        }
    };
    

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 500,
                margin: "auto",
                p: 3,
                position: "relative", 
            }}
        >
            <IconButton
        onClick={handleModalClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                Edit Provider Details
            </Typography>

            <Avatar
        alt={providerData.username || "Profile"}
        src={logoPreview || providerData.logo || "https://via.placeholder.com/80"}
        sx={{ width: 80, height: 80, mb: 2, alignSelf: "center" }}
      />


            <TextField
                label="Username"
                variant="outlined"
                name="username"
                value={providerData.username}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />

            <TextField
                label="Email"
                variant="outlined"
                name="email"
                value={providerData.email}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />

            <TextField
                label="Address"
                variant="outlined"
                name="address"
                value={providerData.address}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />

            <TextField
                label="Phone Number"
                variant="outlined"
                type="number"
                name="phone_no"
                value={providerData.phone_no || ""}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
            />
 <FormControl fullWidth sx={{ mb: 2 }}>
        <Input
          id="logo"
          type="file"
          name="logo"
          onChange={handleFileChange}
        />
        <FormHelperText>Upload logo (optional)</FormHelperText>
      </FormControl>

            <StyledButton type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
            </StyledButton>
        </Box>
    );
};

export default EditProviderFormComponent;
