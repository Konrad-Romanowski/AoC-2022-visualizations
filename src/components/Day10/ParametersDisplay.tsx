interface ParametersDisplayProps {
    cycle: number;
    Xregister: number;
}

export default function ParametersDisplay({cycle, Xregister}:ParametersDisplayProps) {
    return (
        <ul className="crt-parameters">
            <li className="crt-parameters-cycle">Cycle: {cycle}</li>
            <li className="crt-parameters-X">Sprite position (X): {Xregister}</li>
            <li className="crt-parameters-current-pixel">Current Pixel {`(${Math.floor(cycle/40)},${cycle%40})`}</li>
        </ul>
    )
}