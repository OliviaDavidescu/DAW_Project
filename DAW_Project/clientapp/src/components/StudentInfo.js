import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const InfoStudent = () => {

    const [student, setStudent] = useState("");
    const [msg, setMsg] = useState("");
    const { id } = useParams();

    useEffect(() => {
        getStudent();
    }, []);

    const getStudent = async () => {
        try {
            const response = await axios.get(`http://localhost:5193/students/student/${id}`, {
                withCredentials: true
            });
            setStudent(response.data);
            console.log(response.data);
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

    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
        navigate("/");
        }
    }, [isError, navigate]);


    return (
        <div className="dashboard">
            <ThemeProvider theme={theme}>
                <Card style={{backgroundColor: "#116466"}} sx={{ minWidth: 275, mt: 15 }}>
                    <CardContent>
                        <Box sx={{ marginTop: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6" noWrap component="a" flexGrow={1} sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'BlinkMacSystemFont',
                                fontWeight: 700, letterSpacing: '.1rem', color: 'white', textDecoration: 'underline' }}>STUDENT INFO</Typography>  
                            <Typography variant="h6" noWrap component="a" flexGrow={1} sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'BlinkMacSystemFont',
                                fontWeight: 700, letterSpacing: '.1rem', color: 'white', textDecoration: 'none' }}><p>PRENUME: {student && student.firstName}</p></Typography>
                            <Typography variant="h6" noWrap component="a" flexGrow={1} sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'BlinkMacSystemFont',
                                fontWeight: 700, letterSpacing: '.1rem', color: 'white', textDecoration: 'none' }}><p>NUME: {student && student.lastName}</p></Typography>
                            <Typography variant="h6" noWrap component="a" flexGrow={1} sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'BlinkMacSystemFont',
                                fontWeight: 700, letterSpacing: '.1rem', color: 'white', textDecoration: 'none' }}><p>NUMAR MATRICOL: {student && student.identityNumber}</p></Typography>
                        </Box>
                    </CardContent>
                </Card>
            </ThemeProvider>
        </div>
    );
};

export default InfoStudent;