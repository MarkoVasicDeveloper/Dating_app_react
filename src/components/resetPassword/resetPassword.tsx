import { useEffect, useState } from "react";
import { apiRequest } from "../../api/apiRequest";
import { Button } from "../layout/button/button";
import { Input } from "../layout/input/input";
import './resetPassword.scss';

export function ResetPassword() {
    const [ email, setEmail ] = useState('');
    const [ role, setRole ] = useState('');
    const [ disabled, setDisabled ] = useState(true);
    const [ message, setMessage ] = useState({status: '', message: ''})

    useEffect(() => {
      if(email !== '' && role !== '') return setDisabled(false);
      setDisabled(true);
    }, [email, role]);

    async function getResetLink() {
        setMessage({status: '', message: ''})
        const resetLink = await apiRequest(`/resetLink/${email}/${role}`, 'get', '', role as any);

        if(resetLink.data.status === 'error') return setMessage({status: 'error', message: 'Pogresna mail adresa!'});
        setMessage({status: 'ok', message: 'Link za reset je poslat na Vas mail!'})
    }
    
    return (
        <div className="resetPasswordContainer">
            <h2>Resetuj lozinku</h2>
            <Input onChangeInput={setEmail} name={'email'} id={"email"} title={"Email:"} required />
            <div className='radio-inputs'>
                <Input required id='lady' name='role' title='Dama:' onChangeInput={setRole} type='radio' footnoteTitle='Izaberite ulogu!'/>
                <Input required id='gentleman' name='role' title='Dzentlman:' onChangeInput={setRole} type='radio' footnoteTitle='Izaberite ulogu!'/>
            </div>
            <span className={message.status === 'ok' ? 'succes-span' : 'invalid-span'} >{message.message}</span>
            <div className="submit-button">
                <Button type="submit" disabled = {disabled} title={"Posalji"} onClickFunction={getResetLink} />
            </div>
        </div>
    )
}