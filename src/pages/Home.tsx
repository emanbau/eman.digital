import { useEffect, useRef, ReactElement } from 'react'
import './Home.scss';
import ThreeImage from '../components/ThreeImage';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

interface Props {
    loading: boolean;
}

function Home ({ loading }: Props): ReactElement {

    const workRef = useRef(null);
    const aboutRef = useRef(null);
    const contactRef = useRef<HTMLHeadingElement>(null);
    const yearRef = useRef<HTMLHeadingElement>(null);
    const headerOneRef = useRef<HTMLSpanElement>(null);
    const headerTwoRef = useRef<HTMLSpanElement>(null);
    const headerThreeRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        gsap.from([headerOneRef.current, headerTwoRef.current, headerThreeRef.current], {
            delay: 5,
            opacity: 0,
            ease: "sine.out",
            y: 90,
            duration: 1.5,
        });

        gsap.from(workRef.current, {delay: 5, opacity: 0, ease: "sine.out", x: -90, duration: 1.5});
        gsap.from(aboutRef.current, {delay: 5, opacity: 0, ease: "sine.out", x: 90, duration: 1.5});
        gsap.from(contactRef.current, {delay: 5, opacity: 0, ease: "sine.out", x: -90, duration: 1.5});
        gsap.from(yearRef.current, {delay: 5, opacity: 0, ease: "sine.out", x: 90, duration: 1.5});

    }, [workRef, aboutRef, contactRef, yearRef, headerOneRef, headerTwoRef, headerThreeRef]);

    return (
        <div className="home-container-dark">
            <Link to="/work" className="work-nav" ref={workRef}>WORK</Link>
            <Link to="/about" className="about-nav" ref={aboutRef}>ABOUT</Link>
            <h1 className="contact-nav" ref={contactRef}>CONTACT</h1>
            <h1 className="blog-nav" ref={yearRef}>©2021</h1>
            <ThreeImage />
            <h1 className="header">
                <span ref={headerOneRef}>DEVELOPER</span>
                <br/>
                <span ref={headerTwoRef}>DESIGNER</span>
                <br/>
                <span ref={headerThreeRef}>STUDENT.</span>
            </h1>
        </div>
    )
}

export default Home;
