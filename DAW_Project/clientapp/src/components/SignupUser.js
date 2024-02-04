import { useState, useEffect } from 'react';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const RegistrationFormUser = () => {

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

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        try {
        await axios.post("http://localhost:5193/users/create-user", {
            UserName: userName,
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Role: role,
            Password: password
        }, {
            withCredentials: true
        });
        
        navigate("/users");
        } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
            console.log(msg);
        }
        }
        
    };

    return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs" >
			<p>{msg}</p>
				<CssBaseline />
				<Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
					<Typography component="h1" variant="h5">Sign Up</Typography>
					<Box component="form" onSubmit={saveUser} noValidate sx={{ mt: 1 }}>
                        <TextField value={userName} onChange = {(e) => setUserName(e.target.value)} margin="normal" required fullWidth 
								id="last name" label="UserName" name="last name" autoComplete="Last Name" autoFocus/>
						<TextField value={firstName} onChange = {(e) => setFirstName(e.target.value)} margin="normal" required fullWidth 
								id="first name" label="First Name" name="first name" autoComplete="First Name" autoFocus/>
						<TextField value={lastName} onChange = {(e) => setLastName(e.target.value)} margin="normal" required fullWidth 
								id="last name" label="Last Name" name="last name" autoComplete="Last Name" autoFocus/>
						<TextField value={email} onChange = {(e) => setEmail(e.target.value)} margin="normal" required fullWidth
								id="email" label="Email" name="email" autoComplete="email" autoFocus/>
                        <TextField value={role} onChange = {(e) => setRole(e.target.value)} margin="normal" required fullWidth
								id="role" label="Rol: Admin/User" name="role" autoComplete="role" autoFocus/>
						<TextField value={password} onChange = {(e) => setPassword(e.target.value)} margin="normal" required fullWidth
								name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={saveUser}>Sign Up</Button>
					</Box>
				</Box>
			</Container>
	  	</ThemeProvider>
	);
};

export default RegistrationFormUser;