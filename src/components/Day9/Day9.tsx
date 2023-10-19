import React from 'react';
import useFetch from '../../hooks/useFetch';
import AnimationController from '../AnimationController/AnimationController';
import AnimationInterface from '../AnimationController/AnimationInterface';
import ErrorAlert from '../ErrorAlert/ErrorAlert';
import PendingDisplay from '../PendingDisplay/PendingDisplay';
import Instructions from './Instructions';
import InstructionsInterface from './InstructionsInterface'
import {nanoid} from 'nanoid';
import Canvas from './Canvas';
import {ropeInitialState, ropeReducer} from './ropeReducer';
import Counter from '../Counter/Counter';
import useDay9Solution from './useDay9Solution';

export default function Day9() {

    const [rope,ropeDispatch] = React.useReducer(ropeReducer,ropeInitialState);
    const [animation, setAnimation] = React.useState<AnimationInterface>(
        {isRunning: false, isCompleted: false}
    );
    const [instructions, setInstructions] = React.useState<InstructionsInterface>({
        list: [],
        currentInstructionIndex: 0
    });
    const {inputData, isError, isPending} = useFetch('./day9_input.txt');

    // trnasform input data into more usefull structure
    React.useEffect(()=>{
        const moves = inputData.split('\n');

        const instructions = moves.map(move => {
            const direction = move[0];
            const steps = move.match(/\d+/);
            if(steps === null) {
                return {id: nanoid(), direction: 'unknown', numberOfSteps: 0}
            };
            return {id: nanoid(), direction, numberOfSteps: parseInt(steps[0])};
        });

        setInstructions({list: instructions, currentInstructionIndex: 0});
    },[inputData]);

    useDay9Solution({
        animation,
        setAnimation,
        instructions,
        setInstructions,
        ropeDispatch
    });

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
                <>
                    <Canvas
                        rope={rope}
                    />
                    <Counter
                        counterTitle='Visited cells'
                        counter={Object.keys(rope.visitedCells).length}
                    />
                    <Instructions
                        instructions={instructions}
                    />
                </>
            }
        </article>
    )
}