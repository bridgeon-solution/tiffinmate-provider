import { Box, Typography, Grid, Link } from "@mui/material";
import React from "react";
import InputField from "../../Atoms/Input";
import StyledButton from "../../Atoms/Button";
import { useNavigate } from "react-router-dom";

interface DetailsComponentProps {
  formValues: {
    resturentname: string;
    address: string;
    phone: number | null;
    file1: File | null;
    about: string;
    location: string;
    file2: File | null;
    accountnumber: number | null;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFileChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

const DetailsComponent: React.FC<DetailsComponentProps> = ({
  formValues,
  handleChange,
  handleSubmit,
  handleFileChange,
  loading,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        padding: { xs: "1.5rem", md: "3rem" },

        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBottom: "2rem", color: "#333" }}
      >
        Enter Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          {/* Left  */}
          <Grid item xs={12} md={6}>
            <InputField
              label="Restaurant Name"
              onChange={handleChange}
              value={formValues.resturentname}
              variant="outlined"
              name="resturentname"
              fullWidth
              sx={{ marginBottom: "1rem" }}
              required
            />

            <InputField
              label="Address"
              onChange={handleChange}
              value={formValues.address}
              variant="outlined"
              name="address"
              fullWidth
              sx={{ marginBottom: "1rem" }}
              required
            />
            <InputField
              label="Phone"
              onChange={handleChange}
              value={formValues.phone || ""}
              variant="outlined"
              name="phone"
              fullWidth
              sx={{ marginBottom: "1rem" }}
              required
            />
            <Box sx={{ marginBottom: "1rem" }}>
              <Typography
                variant="body1"
                sx={{ marginBottom: "0.5rem", color: "#555" }}
              >
                Upload Logo
              </Typography>
              <InputField
                type="file"
                inputProps={{ accept: ".jpg,.jpeg,.png,.pdf" }}
                onChange={(e) =>
                  handleFileChange(
                    e as React.ChangeEvent<HTMLInputElement>,
                    "file1"
                  )
                }
                required
              />
            </Box>
          </Grid>

          {/* Right  */}
          <Grid item xs={12} md={6}>
            <InputField
              label="About"
              onChange={handleChange}
              value={formValues.about}
              variant="outlined"
              name="about"
              fullWidth
              sx={{ marginBottom: "1rem" }}
              required
            />
            <InputField
              label="Location"
              onChange={handleChange}
              value={formValues.location}
              variant="outlined"
              name="location"
              fullWidth
              sx={{ marginBottom: "1rem" }}
              required
            />
            <InputField
              label="Account Number"
              onChange={handleChange}
              value={formValues.accountnumber || ""}
              variant="outlined"
              name="accountnumber"
              fullWidth
              sx={{ marginBottom: "1rem" }}
              required
            />
            <Box>
              <Typography
                variant="body1"
                sx={{ marginBottom: "0.5rem", color: "#555" }}
              >
                Upload Image
              </Typography>
              <InputField
                type="file"
                inputProps={{ accept: ".jpg,.jpeg,.png,.pdf" }}
                onChange={(e) =>
                  handleFileChange(
                    e as React.ChangeEvent<HTMLInputElement>,
                    "file2"
                  )
                }
                required
              />
            </Box>
          </Grid>
        </Grid>

        {/*  Button */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <StyledButton
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              minWidth: "200px",
              padding: "0.75rem 1rem",
              backgroundColor: loading ? "#a5a5a5" : "#1976d2",
              color: "#fff",
              "&:hover": {
                backgroundColor: loading ? "#a5a5a5" : "#1565c0",
              },
            }}
          >
            {loading ? "Submitting..." : "Submit"}
          </StyledButton>
          {/* link to dashboard */}
          <Typography variant="body2" sx={{ marginTop: "1rem", color: "#333" }}>
            Already entered details?{" "}
            <Link
              component="button"
              underline="none"
              onClick={() => navigate("/dashboard")}
              sx={{ color: "#e6852c", cursor: "pointer", fontWeight: "bold" }}
            >
              Go to Dashboard
            </Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
};

export default DetailsComponent;
