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

const FormBook = () => {

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

    const [name, seName] = useState("");
    const [author, setAuthor] = useState("");
    const [pbhouse, setPbHouse] = useState("");
    const [section, setSection] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        try {
        await axios.post("http://localhost:5193/books/book", {
            Name: name,
            Author: author,
            PublishingHouse: pbhouse,
            Section: section,
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
                          fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',}}>Adaugati o carte</Typography>
				<Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
					<Typography component="h1" variant="h5">Carte</Typography>
					<Box component="form" onSubmit={saveUser} noValidate sx={{ mt: 1 }}>
						<TextField value={name} onChange = {(e) => seName(e.target.value)} margin="normal" required fullWidth 
								id="Nume" label="Nume" name="Nume" autoComplete="Nume" autoFocus/>
						<TextField value={author} onChange = {(e) => setAuthor(e.target.value)} margin="normal" required fullWidth 
								id="Author" label="Author" name="Author" autoComplete="Author" autoFocus/>
						<TextField value={pbhouse} onChange = {(e) => setPbHouse(e.target.value)} margin="normal" required fullWidth
								id="PublishingHouse" label="PublishingHouse" name="PublishingHouse" autoComplete="PublishingHouse" autoFocus/>
                        <TextField value={section} onChange = {(e) => setSection(e.target.value)} margin="normal" required fullWidth
								id="Section" label="Section" name="Section" autoComplete="Section" autoFocus/>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={saveUser}>Add Book</Button>
					</Box>
				</Box>
			</Container>
	  	</ThemeProvider>
	);
};

export default FormBook;