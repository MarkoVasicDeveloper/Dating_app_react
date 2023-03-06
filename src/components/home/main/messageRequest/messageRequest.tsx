import { apiRequest } from "../../../../api/apiRequest";
import { UserContext } from "../../../../context/user.context";
import { Button } from "../../../layout/button/button";
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

interface RequestProps{
    destination: any
}

export function MessageRequest({ destination }: RequestProps) {

    const [ user, setUser ] = useContext(UserContext) as any;
    const [ message, setMessage ] = useState({
        message: '',
        class: ''
    });

    const navigation = useNavigate();

    async function sendRequest() {
        const body = {
            'senderId' : user.id,
            'senderUsername' : user.username,
            'destinationId' : user.role === 'lady' ? destination.gentlemanId : destination.ladyId,
            'lady' : user.role === 'lady' ? true : false
        }
        const response = await apiRequest('/api/conversationRequest', 'post', body, user.role);
        if(response.status === 'error') return navigation('/', {replace: true});
        if(response.data.statusCode === 200) return setMessage({message: 'Zahtev je uspesno prosledjen!', class: 'succes-message'});
        if(response.data.statusCode === 6001) return setMessage({message: 'Zahtev je vec poslat!', class: 'important-message'});
        setMessage({message: 'Izgleda da imamo neki problem!', class: 'important-message'});
    }
    
    return(
        <div>
            <h2>Hajde da se dopisujemo!</h2>
            <div>
                <p>
                    Ukoliko zelis da se dopisujes sa ovom osobom,
                    moras da joj posaljes zahtev koji ona mora da prihvati. Srecno!
                </p>
            </div>
            <div style={{display: "flex", justifyContent: 'center'}}>
                <Button implementClass='succes-button' title={'Posalji zahtev'} onClickFunction={sendRequest} />
            </div>

            <div>
                <p className={message.class}>{message.message}</p>
            </div>
        </div>
    )
}