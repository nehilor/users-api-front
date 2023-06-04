import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import {
    Typography,
    TextField,
    Button,
} from '@mui/material';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { login } from '../services/authService';
import { LoginData } from '../interfaces/interfaces';
import {getLocalToken, setLocalToken} from "../services/sessionService";

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const token = getLocalToken();
        // Check if the user is logged in
        if (token) {
            navigate("/users");
        }
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Perform login API call and retrieve token
            const loginData: LoginData = await login(email, password);
            const { token, success } = loginData;
            if (success) {
                // Store the token in Redux
                dispatch(setToken(token));
                setLocalToken(token);
                // Redirect to the users CRUD screen
                navigate('/users');
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form onSubmit={(e) => handleLogin(e)}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="off"
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="off"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                            margin: 1
                        }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
