import {useState} from 'react';

export function useForm(initialValue){
    const [values, setValues] = useState(initialValue);

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }
    return {values, handleChange, setValues};

}

