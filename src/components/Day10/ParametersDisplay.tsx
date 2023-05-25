import CRTInterface from './CRTInterface'

interface ParametersDisplayProps {
    CRT: CRTInterface
}

export default function ParametersDisplay({CRT}:ParametersDisplayProps) {

    const {X, cycle} = CRT;
    
    return (
        <ul className="crt-parameters">
            <li className="crt-parameters-cycle">Cycle: {cycle}</li>
            <li className="crt-parameters-X">Sprite position (X): {X}</li>
            <li className="crt-parameters-current-pixel">Current Pixel {`(${Math.floor(cycle/40)},${cycle%40})`}</li>
        </ul>
    )
}