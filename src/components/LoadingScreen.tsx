import { ReactElement, useState, Fragment } from 'react'
import { setTimeout } from 'timers';

interface Props {
    loadingHandle: () => void;
}

function LoadingScreen({ loadingHandle }: Props): ReactElement {

    const [percentage, setPercentage] = useState<number>(0);
    for(let i = 0; i <= 100; i++) {
        setTimeout(() => setPercentage(i), 1);
    }

    return (
        <Fragment>
            <h1>{percentage}%</h1>
        </Fragment>
    )
}

export default LoadingScreen;
