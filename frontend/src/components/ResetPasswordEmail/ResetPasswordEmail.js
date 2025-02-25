import * as React from 'react';
import { useState } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit">
                Threadhub
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


    export default function ResetPasswordEmail({setFpStatus, setFpOtpExpires}) {
        const navigate = useNavigate();
    
        const [email, setEmail] = useState('');
        const defaultTheme = createTheme();
        const navigateToPasswordReset = () => {
            navigate('/resetPassword');
          };

        const handleReset = (e) => {
            e.preventDefault();

            

            axios.post(`${process.env.REACT_APP_HTTP_URL}/api/auth/v1/passwordReset`, { email })
            .then(response => {
                
                if (response.data.statusCode === 200) {
                    setFpStatus("FPOTP_PENDING");
                    setFpOtpExpires(Date.now() + 10 * 60 * 1000); // 10 minutes from now
                    localStorage.setItem('email', email);
                    navigateToPasswordReset();
                }
            })
        };
        return (
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Forgot Password
                            </Typography>
                            <Typography component="h2" >
                                Please enter your email address in order to reset your password.
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleReset} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Request OTP
                                </Button>
                                <Copyright sx={{ mt: 5 }} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
