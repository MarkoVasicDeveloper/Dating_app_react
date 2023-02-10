import axios from 'axios';
import { useEffect, useState } from 'react'
import { Button } from '../layout/button/button'
import { Input } from '../layout/input/input'
import './login.scss';
import { baseConfig } from '../../config/baseConfig';
import { apiRequest } from '../../api/apiRequest';

export function LogIn() {

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ role, setRole ] = useState('');
    const [ disabledButton, setDisabledButton ] = useState(true);

    useEffect(() => {
      if(username !== '' && password !== '' && role !== '') return setDisabledButton(false);
      setDisabledButton(true);
    }, [username, password, role]);

    async function sendData(e: any) {
        e.preventDefault()
        
        const response = await apiRequest('/auth/login', 'post', 
            {username, password, lady: role === 'lady' ? true : false} , role as any)
        
        if(response.status === 'error') return console.log('Something went wrong!')
        
        if(response.data.status === 'error') return console.log('Wrong username or password');

        console.log('login', response.data)
        
    }
    
    
    return (
        <section id='login-page'>
            <h1 id='title'>Dzentleman i dama</h1>
            <form>
                <h2>Log in</h2>
                <Input required id='username' name='username' title='Korisnicko ime:' onChangeInput={setUsername} />
                <Input required id='password' name='password' title='Lozinka:' onChangeInput={setPassword} type='password' />
                <div className='radio-inputs'>
                    <Input required id='lady' name='role' title='Dama:' onChangeInput={setRole} type='radio' footnoteTitle='Izaberite ulogu!'/>
                    <Input required id='gentleman' name='role' title='Dzentlman:' onChangeInput={setRole} type='radio' footnoteTitle='Izaberite ulogu!'/>
                </div>
                <div className="submit">
                    <a href="">Zaboravili ste lozinku?</a>
                    <Button title={'Prijavi se'} type = 'submit' onClickFunction={sendData} disabled = {disabledButton} />
                </div>
            </form>
        </section>
    )
}