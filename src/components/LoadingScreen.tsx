import { ReactElement, Fragment, useEffect, useState } from 'react'

interface Props {
    loadingHandle: () => void;
}

function LoadingScreen({ loadingHandle }: Props): ReactElement {

    let [percent, setPercent] = useState<number>(0);

    useEffect(() => {
        setTimeout(() => {
            if (percent < 100) {
                setPercent(percent + 1);
                }
        }, 30);
    }, [percent])

    return (
        <Fragment>
            <h1>{percent}%</h1>
        </Fragment>
    )
}

export default LoadingScreen;
