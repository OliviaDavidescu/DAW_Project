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
import FolderSharedIcon from '@mui/icons-material/FolderShared';


const BooksList = () => {
    const [books, setBooks] = useState([]);
    const { isError } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isError) {
          navigate("/");
        }
    }, [isError, navigate]);
    

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        try {
            const response = await axios.get("http://localhost:5193/books/books", {
                withCredentials: true
            });
            setBooks(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching books:", error);
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
                            <Box sx={{ flexGrow: 0, p: 1}}><FolderSharedIcon/></Box>
                            <Typography variant="h6" noWrap component="a" sx={{mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace',
                                        fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',}}>CARTI DISPONIBILE |</Typography>
                            <Typography variant="h6" noWrap component="a" sx={{mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace',
                                        fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',}}> Cartile afisate mai jos se afla in biblioteca si pot fi imprumutate</Typography>
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
                                                <StyledTableCell align="center">AUTOR</StyledTableCell>
                                                <StyledTableCell align="center">EDITURA</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {books.map((book) => (
                                                <StyledTableRow key={book.id}>
                                                    <StyledTableCell align="center" component="th" scope="row">{book.name}</StyledTableCell>
                                                    <StyledTableCell align="center">{book.author}</StyledTableCell>
                                                    <StyledTableCell align="center">{book.publishingHouse}</StyledTableCell>
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

export default BooksList;