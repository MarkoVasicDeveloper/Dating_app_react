import { formValidation } from '../../../misc/formValidation';
import './textarea.scss';
import { useState } from 'react';

interface textareaProps{
    title: string
    id: string
    required?: boolean
    onChange: any
}

export function Textarea({ title, id, required, onChange}: textareaProps) {
    const [ dirty, setDirty ] = useState(false);
    const [ invalid, setInvalid ] = useState(false);
    const [ message, setMessage ] = useState('');

    function validation(value: string) {
        const result = formValidation(value, 'textarea', dirty, required);
        if(!result.valid) {
            setInvalid(true);
            setMessage(result.value);
            return;
        };

        setInvalid(false);
        setMessage('');
        onChange(value);
    }
    
    return (
        <div className='textarea-container'>
            <label htmlFor={id}>{title}</label>
            <textarea 
                onChange={(e) => validation(e.target.value)} 
                required={required} 
                className={invalid ? "input-invalid" : "default-input" }
                name={id} 
                id={id}  
                rows={6} 
                minLength={50}
                onFocus = {() => setDirty(true)}
                onBlur = {(e) => validation(e.target.value)}
            />
            <div>
                <span className='invalid-input-message'>{message}</span>
            </div>
        </div>
    )
}