import './conversationRequest.scss';
import { faFaceKissBeam, faFaceRollingEyes, faHeartCircleBolt, faHouseFlag, faSchool, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { apiRequest } from '../../../api/apiRequest';
import { UserContext } from '../../../context/user.context';
import { Button } from '../../layout/button/button';
import { UserInfo } from './userInfo/userInfo';

interface RequestProps {
    request: any
}

export function ConversationRequest({request}: RequestProps) {

    const [ user, setUser ] = useContext(UserContext) as any;

    const [ requestInfo, setRequestInfo ] = useState([]) as any;

    useEffect(() => {
      (() => {
        request.forEach(async (req: {id: number, username: string}) => {
            const users = await apiRequest(`api/get/${user.role === 'lady' ? 'gentleman' : 'lady'}/${req.id}`, 'get', null, user.role);
            if(users.data.status === 'error') return;
            setRequestInfo((prev: any) => [...prev, users.data]);
        })
      })()
    }, [])
    
    
    return (
        <section>
            {
                request === 0 ? 
                    <div className='request-container'>
                        <h2>Nemate zahteva za povezivanje.</h2>
                        <span><FontAwesomeIcon icon={faFaceRollingEyes} /></span>
                    </div> :
                    <div className='request-container'>
                        <h2>Zahtevi za povezivanje! <span><FontAwesomeIcon icon={faFaceKissBeam} /></span></h2>
                        <div className="request">
                            {
                                requestInfo.map((request: any, index: number) => (
                                    <UserInfo key={index} request={request} otherPhotosDestination={user.otherPhotosDestination} />
                                ))
                            }
                        </div>
                    </div>
            }
        </section>
    )
}