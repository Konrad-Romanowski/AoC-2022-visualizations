import React from 'react';
import useFetch from '../../hooks/useFetch';
import AnimationController from '../AnimationController/AnimationController';
import AnimationInterface from '../AnimationController/AnimationInterface';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import PendingDisplay from '../PendingDisplay/PendingDisplay';

export default function Day9() {

    // const [rope,dispach] = React.useReducer(ropeReducer,initialState);
    const [animation, setAnimation] = React.useState<AnimationInterface>(
        {isRunning: false, isCompleted: false}
    );

    const {inputData, isError, isPending} = useFetch('./day9_input.txt');

    React.useEffect(()=>{
        const moves = inputData.split('\n');

        // const instructions = moves.forEach(move => {
            // const direction = move[0];
            // const numberOfSteps = parseInt(move.match(/\d+/));
            // const instruction = {direction, numberOfSteps};
        // });
    },[inputData]);

    return (
        <article>
            <header className='sub-header'>Day 9 part 2 visualization</header>
            <AnimationController 
                animation={animation}
                setAnimation={setAnimation}
            />
            {
                isError ? <ErrorAlert /> :
                isPending ? <PendingDisplay/> :
                <div>Day 9 placeholder</div>
            }
        </article>
    )
}