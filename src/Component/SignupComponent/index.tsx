import { Box, Typography } from "@mui/material";
import StyledButton from "../../Atoms/Button";
import InputField from "../../Atoms/Input";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

interface SignupComponentProps {
  formValues: {
    username: string;
    email: string;
    file: File | null;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSignupSuccessful: boolean;
  setIsSignupSuccessful:(value:boolean)=>void;
  loading: boolean; 
}

const clientId = "559629451871-bljindknsj2iupf6lv5shmc2c3g7mu7m.apps.googleusercontent.com"; 

const SignupComponent: React.FC<SignupComponentProps> = ({
  formValues,
  handleChange,
  handleFileChange,
  handleSubmit,
  isSignupSuccessful,
  setIsSignupSuccessful,
  loading
}) => {
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const onGoogleSuccess = async (credentialResponse: any) => {
  console.log("Google Token:", credentialResponse.credential);
  try {
    const response = await axios.post("https://localhost:7009/api/Auth/google", {
      token: credentialResponse.credential,
    });
    console.log("Google Auth Response:", response.data);
      alert("Login successful!");
    } catch (error) {
      console.error("Google Login Error:", error);
      alert("Login failed!");
    }
  }
  const onGoogleFailure = () => {
    console.log("Google Login Failed");
    alert("Google login failed!");
  };


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSignupSuccessful(false);
    handleSubmit(e);

   
   
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
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
              textAlign: 'center',
            }}
          >
            SignUp
          </Typography>
          <form onSubmit={onSubmit}>
            <Box 
              sx={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: "1rem", 
                marginTop: "2rem" 
              }}
            >
              <InputField
                label="Name"
                variant="outlined"
                value={formValues.username}
                name="username"
                onChange={handleChange}
              />
              <InputField
                label="Email"
                variant="outlined"
                value={formValues.email}
                name="email"
                onChange={handleChange}
              />

              <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Typography>Upload Certificate</Typography>
                <InputField
                  type="file"
                  inputProps={{ accept: ".jpg,.jpeg,.png,.pdf" }} 
                  onChange={handleFileChange}
                  variant="outlined"
                />
              </Box>
{loading?(
                <Box
                sx={
                  {
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    marginBottom:'1rem',
                  }
                }
                >
                  <CircularProgress size={18}/>
                  </Box>
              ):<StyledButton type="submit" variant="contained">
                
              Submit
            </StyledButton>}
              

              {isSignupSuccessful && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  Signup successful! You will receive a password in your email after verification.
                </Typography>
              )}
               {/* Google Login Button */}
               <GoogleLogin onSuccess={onGoogleSuccess} onError={onGoogleFailure} />

               

              <Typography
                sx={{
                  textAlign: "center",
                  marginTop: "1rem",
                  fontSize: "14px",
                  color: "text.primary",
                }}
              >
                ALREADY HAVE AN ACCOUNT?{' '}
                <Box
                  component="span"
                  sx={{
                    color: "#e6852c",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  <Link
                    to="/login"
                    style={{
                      textDecoration: "none",
                      color: "#e6852c",
                    }}
                  >
                    Login
                  </Link>
                </Box>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
    </GoogleOAuthProvider>
  );
};

export default SignupComponent;
