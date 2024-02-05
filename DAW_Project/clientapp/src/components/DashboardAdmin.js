import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MeUser } from "../features/authSlice";
import { LogoutUser, reset } from "../features/authSlice";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';

export const DashboardA = () => {
    const [checkouts, setCheckOuts] = useState([]);
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);
    const { client } = useSelector((state) => state.auth);


    useEffect(() => {
        if (isError) {
        navigate("/");
        }
    }, [isError, navigate]);



    useEffect(() => {
        getCheckOuts();
    }, []);

    const getCheckOuts = async () => {
        try {
            const response = await axios.get("http://localhost:5193/checkouts/checkouts", {
                withCredentials: true
            });
            setCheckOuts(response.data.$values);
            console.log(response.data.$values);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

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

    
    return (
      <>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography variant="h6" noWrap component="a" sx={{mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace',
                          fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',}}>DASHBOARD |</Typography>
              <Box sx={{ flexGrow: 0, p: 1}}><AccountCircleIcon/></Box>
              <Typography variant="h6" noWrap flexGrow={3} component="a" sx={{ mr: 2, display: { xs: 'none', md: 'flex' },
                          fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit',
                          textDecoration: 'none'}}>Buna, bine ai (re)venit!</Typography>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => navigate("/checouts/create")}>ADAUGA UN CHECKOUT</Button>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => navigate("/books/create")}>ADAUGA O CARTE</Button>
            </Toolbar>
          </Container>
        </AppBar>
        <Typography variant="h6" noWrap component="a" sx={{ mr: 2, mt:2, display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit',
                    textDecoration: 'none'}}>Imprumuturile realizate de studenti</Typography>
        <Container component="main" maxWidth="lg" >
            <CssBaseline />
                <Box sx={{marginTop: 8}}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">ID STUDENT</StyledTableCell>
                                    <StyledTableCell align="center">ID CARTE</StyledTableCell>
                                    <StyledTableCell align="center">DE LA</StyledTableCell>
                                    <StyledTableCell align="center">PANA LA</StyledTableCell>
                                    <StyledTableCell align="center">INFO CARTE</StyledTableCell>
                                    <StyledTableCell align="center">INFO STUDENT</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {checkouts && checkouts.map((checkout) => (
                                    <StyledTableRow key={checkout.id}>
                                        <StyledTableCell align="center" component="th" scope="row">{checkout.studentId}</StyledTableCell>
                                        <StyledTableCell align="center">{checkout.bookId}</StyledTableCell>
                                        <StyledTableCell align="center">{checkout.from}</StyledTableCell>
                                        <StyledTableCell align="center">{checkout.to}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button type="submit" variant="contained" align="center" onClick={() => navigate(`/books/book/${checkout.bookId}`)}>INFO CARTE</Button>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button type="submit" variant="contained" align="center" onClick={() => navigate(`/students/student/${checkout.studentId}`)}>INFO STUDENT</Button>
                                        </StyledTableCell>
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
  
  export default DashboardA;