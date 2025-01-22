
import { useState } from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl'

import './Demo.css';

function Demo() {

    const {
        isLoaded,
        loadingProgression,
        unityProvider
    } = useUnityContext({
        loaderUrl: 'https://econosim.org/webgl/EconoSim.loader.js',
        dataUrl: 'https://econosim.org/webgl/EconoSim.data.gz',
        frameworkUrl: 'https://econosim.org/webgl/EconoSim.framework.js.gz',
        codeUrl: 'https://econosim.org/webgl/EconoSim.wasm.gz',

        companyName: "EconoSim",
        productName: "EconoSim",
        productVersion: "0.0.1",
    })

    const [unity] = useState()

    return (
        <div className="demo">
            <div className="container">
                <Unity
                    className="unity-canvas"
                    devicePixelRatio={window?.devicePixelRatio || 1}
                    unityProvider={unityProvider}
                />
                {!isLoaded && (
                    <div className="loading">
                        <div className="loading-message">
                            Loading...{(loadingProgression * 100).toFixed(0)}%
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Demo
