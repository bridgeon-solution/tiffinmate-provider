import { Box, Typography } from '@mui/material';
import StyledButton from '../../Atoms/Button';
import InputField from '../../Atoms/Input';
import { Link } from 'react-router-dom';

interface LoginComponentProps {
  formValues: {
    email: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({
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
          display: { xs: 'none', md: 'block' },
          flex: 1.5,
        }}
      >
        <img
          src="https://artandcreativity.com/wp-content/uploads/2019/03/food-photography-101.jpg"
          alt="auth-image"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
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
            Login
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
              <Typography
                sx={{
                  textAlign: 'center',
                  marginTop: '1rem',
                  fontSize: '14px',
                  color: 'text.primary',
                }}
              >
                Don't have an account?{' '}
                <Box
                  component="span"
                  sx={{
                    color: '#e6852c',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  <Link
                    to="/"
                    style={{
                      textDecoration: 'none',
                      color: '#e6852c',
                    }}
                  >
                    Register Now.
                  </Link>
                </Box>
              </Typography>
              <Typography
                sx={{
                  textAlign: 'center',
                  marginTop: '1rem',
                  fontSize: '14px',
                  color: 'text.primary',
                }}
              >
                Forgot Password?{' '}
                <Box
                  component="span"
                  sx={{
                    color: '#e6852c',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  <Link
                    to="/mail"
                    style={{
                      textDecoration: 'none',
                      color: '#e6852c',
                    }}
                  >
                    Reset.
                  </Link>
                </Box>
              </Typography>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginComponent;
