import CRT from './CRTInterface';

interface CRTDisplayProps {
    CRTparameters: CRT
}

export default function CRTdisplay({CRTparameters}: CRTDisplayProps) {

    const {X, cycle, display} = CRTparameters;

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