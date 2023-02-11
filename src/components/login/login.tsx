import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { Button } from '../layout/button/button'
import { Input } from '../layout/input/input'
import './login.scss';
import { apiRequest } from '../../api/apiRequest';
import { UserContext } from '../../context/user.context';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../modal/modal';
import { ResetPassword } from '../resetPassword/resetPassword';

export function LogIn() {
    const navigate = useNavigate();

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ role, setRole ] = useState('');
    const [ disabledButton, setDisabledButton ] = useState(true);
    const [ openModal, setOpenModal ] = useState(false);
    const [ message, setMessage ] = useState('');

    const [ user, setUser ] = useContext(UserContext) as any;

    useEffect(() => {
      if(username !== '' && password !== '' && role !== '') return setDisabledButton(false);
      setDisabledButton(true);
    }, [username, password, role]);

    async function sendData(e: any) {
        e.preventDefault()
        setMessage('')
        
        const response = await apiRequest('/auth/login', 'post', 
            {username, password, lady: role === 'lady' ? true : false} , role as any)
        console.log(response)
        if(response.status === 'error') return setMessage('Something went wrong!');

        if(response.data.statusCode === -20001) return setMessage('Na mail Vam je poslat link za verifikaciju!')
        
        if(response.data.status === 'error') return setMessage('Pogresna lozinka ili korisnicko ime!');

        setUser((prev: any) => [...prev, {
            id: response.data.id,
            username: response.data.username,
            token: response.data.token,
            role: response.data.role
        }])
        navigate('/Home', {replace: true})
    }
    
    
    return (
        <>
        <section id='login-page'>
            <h1 id='title'>Dzentleman i dama</h1>
            <form>
                <h2>Log in</h2>
                <div className="message">
                    <span className='invalid-span'>{message}</span>
                </div>
                <Input required id='username' name='username' title='Korisnicko ime:' onChangeInput={setUsername} />
                <Input required id='password' name='password' title='Lozinka:' onChangeInput={setPassword} type='password' />
                <div className='radio-inputs'>
                    <Input required id='lady' name='role' title='Dama:' onChangeInput={setRole} type='radio' footnoteTitle='Izaberite ulogu!'/>
                    <Input required id='gentleman' name='role' title='Dzentlman:' onChangeInput={setRole} type='radio' footnoteTitle='Izaberite ulogu!'/>
                </div>
                {openModal}
                <div className="submit">
                    <Button title={'Zaboravili ste lozinku?'} implementClass='linkButton' onClickFunction={() => setOpenModal(true)} />
                    <Button title={'Prijavi se'} type = 'submit' onClickFunction={sendData} disabled = {disabledButton} />
                </div>
            </form>
        </section>
        <Modal open={openModal} close={() => setOpenModal(false)} >
            <ResetPassword />
        </Modal>
        </>
    )
}