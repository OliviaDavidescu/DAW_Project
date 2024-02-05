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

const RegistrationFormStudent = () => {

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
    const [idNr, setIdNr] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        try {
        await axios.post("http://localhost:5193/students/student", {
            FirstName: firstName,
            LastName: lastName,
            IdentityNumber: idNr,
        }, {
            withCredentials: true
        });
        
        navigate("/dashboarduser");
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
                <Typography variant="h6" component="a" sx={{mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace',
                          fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',}}>Creeati un profil de student pentru a putea imprumuta carti</Typography>
				<Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
					<Typography component="h1" variant="h5">Inregistrare</Typography>
					<Box component="form" onSubmit={saveUser} noValidate sx={{ mt: 1 }}>
						<TextField value={firstName} onChange = {(e) => setFirstName(e.target.value)} margin="normal" required fullWidth 
								id="first name" label="First Name" name="first name" autoComplete="First Name" autoFocus/>
						<TextField value={lastName} onChange = {(e) => setLastName(e.target.value)} margin="normal" required fullWidth 
								id="last name" label="Last Name" name="last name" autoComplete="Last Name" autoFocus/>
						<TextField value={idNr} onChange = {(e) => setIdNr(e.target.value)} margin="normal" required fullWidth
								id="idnr" label="Identity Number" name="Identity Number" autoComplete="Identity Number" autoFocus/>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={saveUser}>Sign Up</Button>
					</Box>
				</Box>
			</Container>
	  	</ThemeProvider>
	);
};

export default RegistrationFormStudent;