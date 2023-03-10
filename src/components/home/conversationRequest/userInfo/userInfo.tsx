import { faHeartCircleBolt, faHouseFlag, faSchool, faUserAstronaut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "../../../layout/button/button"
import { useContext, useEffect, useState } from 'react';
import './userInfo.scss';
import { apiRequest } from "../../../../api/apiRequest";
import { UserContext } from "../../../../context/user.context";

interface UserInfoProps{
    request: any
    otherPhotosDestination: string,
    index: number
    remove: any
}

export function UserInfo({ request, otherPhotosDestination, index, remove }: UserInfoProps) {

    const [ user, setUser ] = useContext(UserContext) as any;
    const [ hide, setHide ] = useState(false);

    async function acceptRequest() {
        const requestBody = {
            "id": user.id,
            "username": user.username,
            "lady": user.role === 'lady' ? true : false,
            "userId" : user.role === 'lady' ? request.gentlemanId : request.ladyId ,
            "userUsername": request.username
        }
        const recive = await apiRequest('api/acceptConversation', 'post', requestBody, user.role);
        
        if(recive.status !== 'error') setHide(true);
        remove(index);
    }
    
    return (
        <div className={hide ? 'hide': "user-request"}>
            <div className="user-request-img">
                <img src={`${otherPhotosDestination}/${request.username}/${user.role === 'lady' ? request.photosGentlemen[0]?.path : request.photosLadies[0]?.path}`} alt={request.username} />
            </div>
            <div className="user-request-info">
                <div>
                    <span>{request.username} </span>
                    <span>{new Date().getFullYear() - request.dateOfBirth.slice(-4)}</span>
                </div>
                <div>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faHouseFlag} />
                            <span>{request.city}</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faSchool} />
                            <span>{user.role === 'lady' ? request.gentlemanAbouts[0]?.educations : request.ladyAbouts[0]?.educations}</span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faHeartCircleBolt} />
                            <span>{user.role === 'lady' ? request.gentlemanAbouts[0]?.maritalStatus : request.ladyAbouts[0]?.maritalStatus}</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faUserAstronaut} />
                            <span>{user.role === 'lady' ? request.gentlemanAbouts[0]?.profession : request.ladyAbouts[0]?.profession}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="options">
                <div>
                    <Button implementClass="danger-button" title={'ODBI'} onClickFunction={undefined} />
                    <Button implementClass="safe" title={'Vidi profil'} onClickFunction={undefined} />
                </div>
                <div>
                    <Button type='submit' title={'Prihvati'} onClickFunction={() => acceptRequest()} />
                </div>
            </div>
        </div>
    )
}