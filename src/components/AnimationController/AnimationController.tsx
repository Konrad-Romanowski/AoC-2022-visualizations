import React from 'react';
import './animationController.css';
import Animation from './AnimationInterface'

interface animationControllerProps {
    animationState: Animation;
    setAnimationState: React.Dispatch<React.SetStateAction<Animation>>;
}

export default function AnimationController({animationState, setAnimationState}:animationControllerProps) {

    function handleClick() {
        setAnimationState(prevState => {
            return { ...prevState, isRunning: !prevState.isRunning}
        });
    }

    return (
        <section className="controllers">
            <button onClick={handleClick}>{animationState.isRunning ? "Stop" : "Start"}</button>
        </section>
    )
}