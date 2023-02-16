import { formValidation } from "../../../misc/formValidation"
import { useState } from 'react';
import './select.scss';

interface selectOptions {
    title: string
    id: string
    options: string[] | number[] | (string | number)[]
    required?: boolean
    onChange: any
}

export function Select({ title, id, options, required, onChange }: selectOptions) {
    const [ dirty, setDirty ]  = useState(false);
    const [ message, setMessage ] = useState('')

    function validation(value: string) {
        const validationResult = formValidation(value, 'select', dirty, required);
        if(!validationResult.valid) {
            setMessage('Ovo polje je obavezno!');
            onChange('');
            return;
        };
        
        setMessage('');
        onChange(value);
    }
    
    return (
        <div className="select-container">
            <label htmlFor={id}>{title}</label>
            <select 
                className="select-input"
                required={required} 
                name={id} 
                id={id} 
                onChange={(e) => validation(e.target.value)} 
                onFocus={() => setDirty(true)}
            >
                {
                    options.map((value: string | number, index: number) => <option className="option" key={index} value={value}>{value}</option>)
                }
            </select>
            <div>
                <span className="invalid-input-message">{message}</span>
            </div>
        </div>
    )
}