import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';


const StudentsList = () => {
    const [students, setStudents] = useState([]);
    const { isError } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isError) {
            navigate("/");
        }
    }, [isError, navigate]);

    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = async () => {
        try {
            const response = await axios.get("http://localhost:5193/students/students", {
                withCredentials: true
            });
            setStudents(response.data.$values);
            console.log(response.data.$values);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };


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

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
      
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <>
            <ThemeProvider theme={theme}>
            <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Box sx={{ flexGrow: 0, p: 1}}></Box>
                            <Box sx={{ flexGrow: 0, p: 1}}><AutoStoriesIcon/></Box>
                            <Box sx={{ flexGrow: 0, p: 1}}></Box>
                            <Typography variant="h6" noWrap component="a" sx={{mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace',
                                        fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',}}>STUDENTI INSCRISI |</Typography>
                            <Box sx={{ flexGrow: 0, p: 1}}></Box>
                            <Typography variant="h6" noWrap component="a" sx={{mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace',
                                        fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',}}> Mai jos sunt afisati studentii care au abonament la Biblioteca</Typography>
                        </Toolbar>
                    </Container>
                </AppBar>
                    <Container component="main" maxWidth="lg" >
                        <CssBaseline />
                            <Box sx={{marginTop: 8}}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell align="center">NUME</StyledTableCell>
                                                <StyledTableCell align="center">PRENUME</StyledTableCell>
                                                <StyledTableCell align="center">NUMAR MATRICOL</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {students && students.map((student) => (
                                                <StyledTableRow key={student.id}>
                                                    <StyledTableCell align="center" component="th" scope="row">
                                                        {student.lastName}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">{student.firstName}</StyledTableCell>
                                                    <StyledTableCell align="center">{student.identityNumber}</StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Container>
            </ThemeProvider>
        </>
    );
};

export default StudentsList;