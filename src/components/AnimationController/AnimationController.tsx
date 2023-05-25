import React from 'react';
import './animationController.css';
import AnimationInterface from './AnimationInterface'

interface animationControllerProps {
    animation: AnimationInterface;
    setAnimation: React.Dispatch<React.SetStateAction<AnimationInterface>>;
}

export default function AnimationController({animation, setAnimation}:animationControllerProps) {

    function handleClick() {
        setAnimation(prevState => {
            return { ...prevState, isRunning: !prevState.isRunning}
        });
    }

    return (
        <section className="controllers">
            <button onClick={handleClick}>{animation.isRunning ? "Stop" : "Start"}</button>
        </section>
    )
}