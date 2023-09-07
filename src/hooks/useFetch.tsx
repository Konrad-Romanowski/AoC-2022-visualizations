import React from 'react';
import { useEffect } from 'react';

export default function useFetch(url:string) {
    const [isError,setIsError] = React.useState<Boolean>(false);
    const [isPending,setIsPending] = React.useState<Boolean>(true);
    const [inputData, setInputData] = React.useState<String>('');

    useEffect(()=>{
        async function getData(url:string) {
            try {
                setIsError(false);
                setIsPending(true);
                const response = await fetch(url);
                if(!response.ok) {
                    throw Error('Cannot load input data.');
                }
                const input = await response.text();
                setInputData(input);
            } catch (err) {
                setIsError(true);
                console.log(err);
            } finally {
                setIsPending(false);
            }
        }
        getData(url);
    },[url]);

    return {inputData, isError, isPending}
}
