import React from 'react';
import videoBg from '../assets/Video.mp4';
import "./HomePage.css";

function HomePage() {

    const VideoBg = () => {
        return (
            <div className='videobg'>
                <video src={videoBg} autoPlay loop muted />
            </div>
        )
    }

    return (
        <div className='mainHomePage'>
            <VideoBg />
            <div className='hpcontents'>
                <h1>BIBLIOTECA</h1> 
                <h2>Universitatea din Bucuresti</h2>
            </div>
        </div>
    )
}

export default HomePage;