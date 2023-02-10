import { useEffect, useLayoutEffect, useState } from 'react';
import './button.scss';

interface Button {
    type?: 'submit' | 'button';
    title: string;
    disabled?: boolean | undefined;
    onClickFunction: any;
    implementClass?: string;
    titleFusnote?: string;
    default?: boolean;
}

export function Button(data: Button) {

    const [ implementClasses, setImplementClasses ] = useState('');

    useLayoutEffect(() => {
        if(data.type === 'submit') return setImplementClasses(data.disabled ? 'disabled' : 'succes-button');
        if(data.implementClass) return setImplementClasses(data.implementClass);
        if(data.default) return setImplementClasses('default')
    }, [data.disabled])
    
    return (
        <button
            className = { implementClasses }
            type = { data.type || 'button' }
            disabled = { data.disabled }
            onClick = { data.onClickFunction }
            title = { data.titleFusnote }
        >{ data.title }</button>
    )
}