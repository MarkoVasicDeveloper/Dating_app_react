import { useState } from 'react';
import { formValidation } from '../../../misc/formValidation';
import './input.scss';

interface InputParam{
    onChangeInput: any,
    type?: string;
    name: any;
    id: string;
    required?: boolean;
    title: string;
    footnoteTitle?: string
    placeholder?: string
}

export function Input({ onChangeInput, type, name, id, title, required, footnoteTitle, placeholder }: InputParam) {

    const [ message, setMessage ] = useState(' ');
    const [invalid, setInvalid] = useState(false);
    const [ dirty, setDirty ] = useState(false);

    function validation (value: string) {
        const validationResult = formValidation(value, name, dirty, required);
        
        if(validationResult.valid === false) {
            setMessage(validationResult.value);
            setInvalid(true);
            onChangeInput('')
            return 
        }

        setInvalid(false);
        setMessage('');
        onChangeInput(value)
    }

    return(
        <div className={ type === 'radio' ? 'input-div radio' : 'input-div'}>
            <label htmlFor={ id } title = { footnoteTitle }>{ title }</label>
            <input 
                className={ invalid ? 'input-invalid' : 'default-input'}
                name = { name }
                type = { type || 'text'}
                onChange={(e) => validation(e.target.value)}
                id = { id }
                onFocus = {() => setDirty(true)}
                onBlur = {(e) => validation(e.target.value)}
                value = { type === 'radio' ? id : undefined }
                title = { footnoteTitle }
                placeholder = { placeholder }
            />
            <span className='invalid-input-message'>{message}</span>
        </div>
    )
}