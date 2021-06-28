import React from 'react'
import './Home.scss';
import ThreeImage from '../components/ThreeImage';

const Home: React.FC = () => {
    return (
        <div className="home-container-dark">
            <h1 className="work-nav">WORK</h1>
            <h1 className="about-nav">ABOUT</h1>
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
