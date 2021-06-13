import React from 'react'
import './Home.scss';

const Home: React.FC = () => {
    return (
        <div className="home-container-dark">
            <h1 className="work-nav">work</h1>
            <h1 className="about-nav">about</h1>
            <div className="eman-picture"/>
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
