import { ReactElement, Fragment, useEffect, useState } from 'react'
import ThreeGrainFilter from '../components/ThreeGrainFilter';
import '../App.scss';

interface Props {
    loadingHandle: () => void;
    loading: boolean;
}

function LoadingScreen({ loadingHandle, loading }: Props): ReactElement {

    let [percent, setPercent] = useState<number>(0);

    useEffect(() => {
        setTimeout(() => {
            if (percent < 100) {
                setPercent(percent + 1);
            } else {
                loadingHandle();
            }
        }, 30);
    }, [percent, loadingHandle])

    return (
        <Fragment>
            <ThreeGrainFilter zIndex='z-index-4' />
            <h1 className='loading-header'>Eman Bautista</h1>
            <h1 className='percent'>{percent}%</h1>
            <h1 className="loading-header-two">Selected Works</h1>
        </Fragment>
    )
}

export default LoadingScreen;
