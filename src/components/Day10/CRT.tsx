import React from 'react';

interface CRTprops {
    isAnimationRunning: boolean;
}

export default function CRT({isAnimationRunning}: CRTprops) {

    const pixels = Array.from({length:240}).map((pixel,index) =><div className="crt-pixel" key={index}></div>)

    return (
        <section className="crt-container">
            {pixels}
        </section>
    )
}