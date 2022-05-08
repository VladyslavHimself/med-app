import { IPatient } from './../interfaces/IPatient.interface';
import { useState } from 'react';

export const useFetch = async (callback: () => any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetching = async () => {
        try {
            setIsLoading(true);
            await callback();
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return [fetching, isLoading, error];
};
