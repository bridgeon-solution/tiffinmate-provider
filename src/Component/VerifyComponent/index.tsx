import { Box, Typography } from '@mui/material';
import StyledButton from '../../Atoms/Button';
import InputField from '../../Atoms/Input'

interface OtpComponentProps {
  formValues: {
    email: string;
    otp: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const OtpComponent: React.FC<OtpComponentProps> = ({
  formValues,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        height: '100vh',
      }}
    >
      {/* Left Section */}
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

      {/* Right Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: '1.5rem', md: '3rem' },
          flex: 1,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: '400px' } }}>
          <Typography
            sx={{
              fontSize: { xs: '24px', md: '33px' },
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            Enter OTP
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginTop: '2rem',
              }}
            >
            
              {/* OTP Field */}
              <InputField
                label="6-Digit OTP"
                variant="outlined"
                value={formValues.otp}
                name="otp"
                onChange={handleChange}
                inputProps={{
                  maxLength: 6,
                  inputMode: 'numeric',
                }}
              />
              <StyledButton type="submit" variant="contained">
                Verify
              </StyledButton>
              <Typography
                sx={{
                  textAlign: 'center',
                  marginTop: '1rem',
                  fontSize: '14px',
                  color: 'text.primary',
                }}
              >
                Didn't receive the OTP?{' '}
                <Box
                  component="span"
                  sx={{
                    color: '#e6852c',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Resend.
                </Box>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default OtpComponent;
