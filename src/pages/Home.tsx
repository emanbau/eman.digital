import React from 'react'
import './Home.scss';
import ThreeImage from '../components/ThreeImage';
import { Link } from 'react-router-dom';


const Home: React.FC = () => {
    return (
        <div className="home-container-dark">
            <Link to="/work" className="work-nav">WORK</Link>
            <Link to="/about" className="about-nav">ABOUT</Link>
            <h1 className="contact-nav">CONTACT</h1>
            <h1 className="blog-nav">©2021</h1>
            <ThreeImage />
            <h1 className="header">
                DEVELOPER
                <br/>
                DESIGNER
                <br/>
                STUDENT.
            </h1>
        </div>
    )
}

export default Home;
