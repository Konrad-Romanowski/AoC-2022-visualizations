import React from 'react';

interface CRTprops {
    cycle: number;
    Xregister: number;
    isAnimationRunning: boolean;
    pixels:boolean[];
}

export default function CRT({isAnimationRunning, cycle, Xregister, pixels}: CRTprops) {

    const CRTdisplay = pixels.map((pixel,index) => {
        let pixelClassName = `crt-pixel`;
        if(cycle === index) pixelClassName = pixelClassName + " active";
        if(pixel) pixelClassName = pixelClassName + " filled";

        return <div className={pixelClassName} key={index}></div>
    });

    // to verify X position of the sprite
    const spriteStyle = {
        transform: `translate(${Xregister*16+2*(Xregister-2)-16}px,${Math.floor(cycle/40)*16+2*(Math.floor(cycle/40)-1)}px)`
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