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

const FormCheckOut = () => {

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

    const [ids, setIdS] = useState("");
    const [idc, setIdC] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        try {
        await axios.post("http://localhost:5193/checkouts/checkout", {
            StudentId: ids,
            BookId: idc,
            from: from,
            to: to,
        }, {
            withCredentials: true
        });
        
        navigate("/dashboardadmin");
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
                          fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',}}>Adaugati un checkout nou</Typography>
				<Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
					<Typography component="h1" variant="h5">CheckOut</Typography>
					<Box component="form" onSubmit={saveUser} noValidate sx={{ mt: 1 }}>
						<TextField value={ids} onChange = {(e) => setIdS(e.target.value)} margin="normal" required fullWidth 
								id="StudentId" label="StudentId" name="StudentId" autoComplete="StudentId" autoFocus/>
						<TextField value={idc} onChange = {(e) => setIdC(e.target.value)} margin="normal" required fullWidth 
								id="BookId" label="BookId" name="BookId" autoComplete="BookId" autoFocus/>
						<TextField value={from} onChange = {(e) => setFrom(e.target.value)} margin="normal" required fullWidth
								id="From" label="From" name="From" autoComplete="From" autoFocus/>
                        <TextField value={to} onChange = {(e) => setTo(e.target.value)} margin="normal" required fullWidth
								id="To" label="To" name="To" autoComplete="To" autoFocus/>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={saveUser}>Add CheckOut</Button>
					</Box>
				</Box>
			</Container>
	  	</ThemeProvider>
	);
};

export default FormCheckOut;