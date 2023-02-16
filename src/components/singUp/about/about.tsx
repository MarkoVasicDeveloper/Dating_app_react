import { Textarea } from "../../layout/textarea/textarea";
import { useContext, useEffect, useState } from 'react';
import { Select } from "../../layout/select/select";
import { Input } from "../../layout/input/input";
import { Button } from "../../layout/button/button";
import { apiRequest } from "../../../api/apiRequest";
import { UserContext } from "../../../context/user.context";
import { useNavigate } from "react-router-dom";

export function About() {
    const [ about, setAbout ] = useState('');
    const [ aboutThePerson, setThePerson ] = useState('');
    const [ height, setHeight ] = useState(1);
    const [ weight, setWeight ] = useState(1);
    const [ school, setSchool ] = useState('');
    const [ profession, setProfession ] = useState('');
    const [ children, setChildren ] = useState('');
    const [ marital, setMarital ] = useState('');
    const [ language, setLanguage ] = useState('');
    const [ trueInformation, setTrueInformation ] = useState('');
    const [ message, setMessage ] = useState('');

    const [ user ] = useContext(UserContext) as any;

    const [ disabled, setDisabled ] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(about === '' || aboutThePerson === '' || school === '' || profession === '' || marital === '' || trueInformation === '' || children === '')
            return setDisabled(true);
        
        setDisabled(false);
      
    }, [about, aboutThePerson, school, profession, marital, trueInformation, children]);

    const maritalStatus = {
        'Slobodan/na': 'free',
        'U braku': 'married',
        'U braku, ali': 'married,but',
        'Komplikovano': 'compicated',
        'U vezi': 'related'
    } as any;

    const schoolStatus = {
        'Osnovna skola': 'primary school',
        'Srednja skola': 'high school',
        'Fakultet': 'college'
    } as any;

    async function sendData(e: any) {
        e.preventDefault();
        
        const response = await apiRequest(`/api/add/${user.role}About`, 'post', {
            [user.role === 'lady' ? 'ladyId' : 'gentlemanId'] : user.id,
            about,
            aboutThePerson,
            height: Number(height),
            weight: Number(weight),
            education: schoolStatus[school],
            profession,
            maritalStatus: maritalStatus[marital],
            children: Number(children),
            language,
            true_information: trueInformation
        }, user.role);

        if(response.status !== 'error') return navigate('/home', {replace: true})
        setMessage('Doslo je do greske!')
    }
    
    
    return (
        <section id="about">
            <h1>O vama</h1>
            <form>
                <div className="message">
                    <span className='important-message'>{message}</span>
                </div>
                <Textarea required onChange={setAbout} title={"Napisite nesto o vama (budite iskreni):"} id={"about"} />
                <Textarea required onChange={setThePerson} title={"Koga zelite da upoznate?"} id={"aboutPerson"} />
                <div className="radio-inputs">
                    <Select title={"Visina:"} id={"height"} options={[...Array.from({length: 81}, (_, i) => i + 150)]} onChange={setHeight} />
                    <Select title={"Tezina:"} id={"weight"} options={[...Array.from({length: 181}, (_, i) => i + 40)]} onChange={setWeight} />
                    <Select required title={"Skola:"} id={"school"} options={['', 'Osnovna skola', 'Srednja skola', 'Fakultet']} onChange={setSchool} />
                </div>
                <Input required onChangeInput={setProfession} name={'profession'} id={"profession"} title={"Zanimanje:"} />
                <div className="radio-inputs">
                    <Select required title={"Bracni status:"} id={"maritalStatus"} options={['', 'Slobodan/na', 'U vezi', 'U braku', 'U braku, ali', 'Komplikovano']} onChange={setMarital} />
                    <Select required title={"Imate dece:"} id={"children"} options={['', ...Array.from(Array(6).keys())]} onChange={setChildren} />
                </div>
                <Input onChangeInput={setLanguage} name={'languages'} id={"languages"} title={"Koje jezike govorite:"} />
                <label>Da li su ovo tacne informacije?</label>
                <Input required id="1" name='trueInformation' title="Da, tacne informacije!" onChangeInput={setTrueInformation} type='radio'/>
                <Input required id="0" name='trueInformation' title="Ne, samo se zezam!" onChangeInput={setTrueInformation} type='radio'/>
                <div className="submit-button">
                    <Button disabled={disabled} type="submit" title={"Posalji"} onClickFunction={sendData} />
                </div>
            </form>
            <button onClick={() => console.log(user)} >sss</button>
        </section>
    )
}