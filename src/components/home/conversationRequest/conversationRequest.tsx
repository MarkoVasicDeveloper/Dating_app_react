import './conversationRequest.scss';
import { faFaceKissBeam, faFaceRollingEyes, faHeartCircleBolt, faHouseFlag, faSchool, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { apiRequest } from '../../../api/apiRequest';
import { UserContext } from '../../../context/user.context';
import { UserInfo } from './userInfo/userInfo';

interface RequestProps {
    request: any
    remove: any
}

export function ConversationRequest({request, remove}: RequestProps) {

    const [ user, setUser ] = useContext(UserContext) as any;
    
    return (
        <section>
            {
                request.length === 0 ? 
                    <div className='request-container'>
                        <h2>Nemate zahteva za povezivanje.</h2>
                        <span><FontAwesomeIcon icon={faFaceRollingEyes} /></span>
                    </div> :
                    <div className='request-container'>
                        <h2>Zahtevi za povezivanje! <span><FontAwesomeIcon icon={faFaceKissBeam} /></span></h2>
                        <div className="request">
                            {
                                request.map((request: any, index: number) => (
                                    <UserInfo remove={remove} index={index} key={index} request={request} otherPhotosDestination={user.otherPhotosDestination} />
                                ))
                            }
                        </div>
                    </div>
            }
        </section>
    )
}