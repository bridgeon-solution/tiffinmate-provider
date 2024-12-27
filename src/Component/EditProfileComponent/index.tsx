import React, { useEffect, useState } from "react";
import GetProfile from "../../Services/Profile";
import PutProfile from "../../Services/EditProfile";
import { Box, TextField, Typography, Avatar, FormControl, Input, FormHelperText } from "@mui/material";
import StyledButton from "../../Atoms/Button";
import { toast } from "react-toastify";

interface ProviderData {
    username: string;
    email: string;
    address: string;
    phone_no: number;
    logo: string;
}

const EditProviderFormComponent: React.FC = () => {
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
                setProviderData(result);
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
            [name]: name === "phone_no" ? Number(value) : value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
    
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
            await PutProfile(formData);
             toast.success("Profile updated successfully!");
        } catch (error) {
          
            toast.error("Error updating profile:"+error)
          
        } finally {
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
            }}
        >
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
