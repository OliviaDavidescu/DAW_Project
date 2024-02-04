import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";

const LoginFormUser = () => {

  	const theme = createTheme({
		palette:{
			background: {
				default: "#ffffff",
			},
			primary:{
				light: '#d1e8e2',
				main: '#116466',
				dark: '#2c3531',
				},
			secondary:{
				light: '#ffcb9a',
				main: '#d9b08c',
				},
		},
	});

	const [username, setusername] = useState("");
	const [parola, setParola] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { client, isError, isSuccess, isLoading, message } = useSelector(
		(state) => state.auth
	);


	useEffect(() => {
		if (client || isSuccess) {
			navigate("/dashboarduser");
		}
		dispatch(reset());
	}, [client, isSuccess, dispatch, navigate]);

	const Auth = (e) => {
		e.preventDefault();
		dispatch(LoginUser({ username, parola }));
	};

  	return (
    <ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
					<Typography component="h1" variant="h5">Login</Typography>
					{isError && <p>{message}</p>}
					<Box component="form" onSubmit={Auth} noValidate sx={{ mt: 1 }}>
						<TextField value={username} onChange = {(e) => setusername(e.target.value)} margin="normal" required fullWidth
									id="UserName" label="UserName" name="UserName" autoComplete="UserName" autoFocus/>
						<TextField value={parola} onChange = {(e) => setParola(e.target.value)} margin="normal" required fullWidth
									name="password" label="Parola" type="password" id="password" autoComplete="current-password"/>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={Auth}>Login</Button>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => navigate("/signupuser")}>Nu aveti cont? Inregistrati-va aici.</Button>
					</Box>
				</Box>
			</Container>
	  	</ThemeProvider>
	);
};

export default LoginFormUser;