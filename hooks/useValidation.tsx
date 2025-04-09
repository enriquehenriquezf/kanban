import { useEffect, useState } from 'react';
import { InputType } from '@/types';

interface ValidationProps {
    state: string;
    valid: boolean | null;
    error?: string | null;
    handleValidation: (text: string) => void;
}

/**
 * Custom hook to handle the validation of different types of inputs
 * @param type - Type of validation to be performed (email, password, text)
 * @returnType {state: string; valid: boolean | null; error: string | null; handleValidation: (text: string) => void; }
 * @returns {ValidationProps} - Object containing the state, validation state, error message and function to handle validation
*/
export const useValidation = (type: InputType): ValidationProps => {
    const [state, setState] = useState<string>('');
    const [valid, setValid] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (state.length != 0) {
            if(type == InputType.EMAIL){
                emailValidation(state);
            }
            else if(type == InputType.PASSWORD){
                passwordValidation(state);
            }
            else if(type == InputType.TEXT){
                textValidation(state);
            } 
        }
    }, [state]);

    /**
     * Function to handle the validation of the state input
     * @param text - State input value
     * @returns - Call function to Validates the state format
     */
    const handleValidation = (text: string) => {
        setState(text);

        if(type == InputType.EMAIL){
            emailValidation(text);
        }
        else if(type == InputType.PASSWORD){
            passwordValidation(text);
        }
        else if(type == InputType.TEXT){
            textValidation(text);
        }
    }

    /**
     * Function to handle the validation of the email input
     * @param text - Email input value
     * @returns - Validates the email format and updates the Error accordingly
    */
    const emailValidation = (text: string) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            setValid(false);
            setError('El correo electrónico no es válido');
        }
        else {
            setValid(true);
            setError(null);
        }
    }

    /**
     * Function to handle the validation of the password input
     * @param text - Password input value
     * @returns - Validates the password format and updates the Error accordingly
    */
    const passwordValidation = (text: string) => {
        const regLetter = /[a-zA-Z]/i;
        const regNumber = /[0-9]/i;

        if (text.length < 6) {
            setValid(false);
            setError('La contraseña debe tener al menos 6 caracteres');
        }
        else if (regLetter.test(text) === false) {
            setValid(false);
            setError('La contraseña debe contener al menos una letra');
        }
        else if (regNumber.test(text) === false) {
            setValid(false);
            setError('La contraseña debe contener al menos un número');
        }
        else {
            setValid(true);
            setError(null)
        }
    }

    const textValidation = (text: string) => {
        if (text.length < 2) {
            setValid(false);
            setError('El texto debe tener al menos 2 caracteres');
        }
        else if (text.length > 50) {
            setValid(false);
            setError('El texto no puede tener más de 50 caracteres');
        }
        else {
            setValid(true);
            setError(null);
        }
    }

    return {
        state,
        valid,
        error,
        handleValidation,
    };
}