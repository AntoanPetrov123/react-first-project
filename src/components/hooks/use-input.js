import { useState } from "react";

const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = event => {
        setEnteredValue(event.target.value);
    };

    const inputBlurHandler = e => {
        setIsTouched(true);
    };

    const resetForm = () => {
        setEnteredValue('');
        setIsTouched(false);
    };


    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError: hasError,
        valueChangeHandler,
        inputBlurHandler,
        resetForm,
    };
};

export default useInput;