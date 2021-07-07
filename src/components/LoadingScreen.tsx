import { ReactElement, Fragment, useEffect, useState, useRef } from 'react'
import ThreeGrainFilter from '../components/ThreeGrainFilter';
import '../App.scss';
import gsap from 'gsap';

interface Props {
    loadingHandle: () => void;
    loading: boolean;
}

function LoadingScreen({ loadingHandle, loading }: Props): ReactElement {

    const [percent, setPercent] = useState<number>(0);

    const headerRef = useRef(null);
    const percentRef = useRef(null);
    const headerTwoRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            if (percent < 100) {
                setPercent(percent + 1);
            } else {
                loadingHandle();
                gsap.to([headerRef.current, percentRef.current, headerTwoRef.current], {
                    opacity: 0,
                });
            }
        }, 30);
    }, [percent, loadingHandle, headerRef, percentRef, headerTwoRef])

    return (
        <Fragment>
            <ThreeGrainFilter zIndex='z-index-4' />
            <h1 className='loading-header' ref={headerRef}>Eman Bautista</h1>
            <h1 className='percent' ref={percentRef}>{percent}%</h1>
            <h1 className="loading-header-two" ref={headerTwoRef}>Selected Works</h1>
        </Fragment>
    )
}

export default LoadingScreen;
