import { useState } from 'react';
import { formValidation } from '../../../misc/formValidation';
import './checkbox.scss';

interface checkboxInput {
    id: string
    onChange: any
    value: string
    title: string
    required?: boolean
    implementClass?: string
}

export function Checkbox({ id, onChange, value, title, required, implementClass }: checkboxInput) {
    const [ dirty, setDirty ] = useState(false)
    const [ message, setMessage ] = useState('');

    function checkedInput(event: any) {
        const validation = formValidation(event.target.checked ? 'true' : '' , "checkbox", dirty, required);
        
        if(!validation.valid) {
            setMessage(validation.value)
            onChange({value, checked: false})
            return;
        };

        setMessage('');
        
        onChange({value, checked: event.target.checked})
    }

    return (
        <div className="checkbox-container">
            <input 
                className='checkedbox'
                type="checkbox" 
                name={id} 
                id={id} 
                value={value}
                onChange={checkedInput}
                required={required}
                onFocus = {() => setDirty(true)}
            />
            <label className={implementClass} htmlFor={id}>{title}</label>
            <div><span className='invalid-input-message'>{message}</span></div>
        </div>
    )
}