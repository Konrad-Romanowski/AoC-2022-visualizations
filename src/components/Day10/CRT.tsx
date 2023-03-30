import React from 'react';

interface CRTprops {
    cycle: number;
    isAnimationRunning: boolean;
}

export default function CRT({isAnimationRunning, cycle}: CRTprops) {

    const pixels = Array.from({length:240}).map((pixel,index) =><div className={cycle === index ? "crt-pixel active" : "crt-pixel"} key={index}></div>)

    return (
        <section className="crt-container">
            {pixels}
        </section>
    )
}