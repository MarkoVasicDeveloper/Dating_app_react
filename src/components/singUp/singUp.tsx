import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../api/apiRequest";
import { Button } from "../layout/button/button";
import { Calendar, subtractYears } from "../layout/calendar/calendar";
import { Checkbox } from "../layout/checkbox/checkbox";
import { Input } from "../layout/input/input";
import { Select } from "../layout/select/select";
import './singUp.scss';


export function SingUp() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');
    const [ date, setDate ] = useState('') as any;
    const [ role, setRole ] = useState('') as any;
    const [ policy, setPolicy ] = useState({value: '', checked: false});
    const [ disabled, setDisabled ] = useState(true);
    const [ message, setMessage ] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
      if(username === '' || password === '' || email === '' || city === '' || state === '' || policy.checked === false || date === '' || role === '')
        return setDisabled(true);

        setDisabled(false);
    }, [username, password, email, city, state, date, policy, role])
    

    async function sendData(e: any) {
        e.preventDefault();
        setMessage('');
        
        const response = await apiRequest(`/api/add/${role}`, 'post', {
            username, password, email, city, state, rules: policy.checked ? '1' : '0', notifications: '1', dateOfBirth: date.toLocaleDateString()
        }, role);
        console.log(response);

        if(response.status === 'error') return setMessage('Something went wrong!');

        if(response.data.statusCode === -1001 || response.data.statusCode === -2001) return setMessage('Korisnicko ime je zauzeto ili je mejl vec iskoriscen!');

        navigate('/singup/about', {replace: true});
    }
  
    return (
        <section id="sing-up" >
            <h1>Kreiraj nalog</h1>

            <div className="form-container">
                <form>
                    <div className="message">
                        <span className='important-message'>{message}</span>
                    </div>
                    <Input required onChangeInput={setUsername} name={'username'} id={"username"} title={"Korisnicko ime:"} />
                    <Input required onChangeInput={setPassword} name={'password'} id={"password"} title={"Lozinka:"} />
                    <Input required onChangeInput={setEmail} name={'email'} id={"email"} title={"Imejl:"} />
                    <Input required onChangeInput={setCity} name={'city'} id={"city"} title={"Grad:"} />
                    <Select required title={"Drzava:"} id={"state"} options={['', 'Srbija', 'Crna Gora', 'BIH', 'Slovenija', 'Hrvatska', 'Austrija', 'Ostalo']} onChange={setState} />
                    <Calendar setDate={setDate} date={date} />
                    <div className='radio-inputs'>
                        <Input required id='lady' name='role' title='Dama:' onChangeInput={setRole} type='radio' footnoteTitle='Izaberite ulogu!'/>
                        <Input required id='gentleman' name='role' title='Dzentlman:' onChangeInput={setRole} type='radio' footnoteTitle='Izaberite ulogu!'/>
                    </div>
                    <Checkbox implementClass="warning" required id={"policy"} onChange={setPolicy} value={"policy"} title={"Prihvati uslove koriscenja"} />
                    <div className="submit-button">
                        <Button type="submit" title={"Nastavi"} onClickFunction={sendData} disabled={disabled} />
                    </div>
                </form>
            </div>
        </section>
    )
}
