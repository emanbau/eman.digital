import React, { ReactElement, useState } from 'react'
import { setTimeout } from 'timers';

function LoadingScreen(): ReactElement {

    const [percentage, setPercentage] = useState<number>(0);
    for(let i = 0; i <= 100; i++) {
        setPercentage(i);
        setTimeout
    }

    return (
        <div>
            
        </div>
    )
}

export default LoadingScreen
