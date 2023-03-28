import React from "react";
import "./animationController.css";

interface animationControllerProps {
    isAnimationRunning: boolean;
    setIsAnimationRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AnimationController({isAnimationRunning, setIsAnimationRunning}:animationControllerProps) {

    function handleClick() {
        setIsAnimationRunning(prevState=>!prevState);
    }

    return (
        <section className="controllers">
            <button onClick={handleClick}>{isAnimationRunning ? "Stop" : "Start"}</button>
        </section>
    )
}