import { Box, Typography } from '@mui/material';
import StyledButton from '../../Atoms/Button';
import InputField from '../../Atoms/Input';

interface LoginComponentProps {
  formValues: {
    email: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function LoginComponent({
  formValues,
  handleChange,
  handleSubmit,
}: LoginComponentProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        height: "100vh",
      }}
    >
      {/* Left */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          flex: 1.5,
        }}
      >
        <img
          src="https://artandcreativity.com/wp-content/uploads/2019/03/food-photography-101.jpg"
          alt="auth-image"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
        />
      </Box>

      {/* Right */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: "1.5rem", md: "3rem" },
          flex: 1,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: { xs: "100%", md: "400px" } }}>
          <Typography
            sx={{
              fontSize: { xs: "24px", md: "33px" },
              fontWeight: 700,
              textAlign:'center'
            }}
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "2rem",
              }}
            >
              <InputField
                label="Email"
                variant="outlined"
                value={formValues.email}
                name="email"
                onChange={handleChange}
              />
              <InputField
                label="Password"
                variant="outlined"
                value={formValues.password}
                name="password" 
                onChange={handleChange}
                type="password"  
              />
              <StyledButton type="submit" variant="contained">
                Submit
              </StyledButton>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginComponent;
