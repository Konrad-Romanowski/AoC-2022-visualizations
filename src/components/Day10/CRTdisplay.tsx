import React from 'react';
import CRTtypes from './CRTtypes';

interface CRTprops {
    // X: number;
    // cycle: number;
    // display: boolean[];
    CRT: CRTtypes
}

export default function CRTdisplay({CRT}: CRTprops) {

    const {X, cycle, display} = CRT;

    const CRTdisplay = display.map((pixel,index) => {
        let pixelClassName = `crt-pixel`;
        if(cycle === index) pixelClassName = pixelClassName + " active";
        if(pixel) pixelClassName = pixelClassName + " filled";

        return <div className={pixelClassName} key={index}></div>
    });

    const spriteStyle = {
        transform: `translate(${X*16+2*(X-2)-16}px,${Math.floor(cycle/40)*16+2*(Math.floor(cycle/40)-1)}px)`,
        display: cycle>=240 ? "none" : "block"
    }

    return (
        <section className="crt-container">
            <div className="crt">
                <div className="sprite" style={spriteStyle}></div>
                {CRTdisplay}
            </div>
        </section>
    )
}