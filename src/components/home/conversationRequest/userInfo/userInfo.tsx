import { faHeartCircleBolt, faHouseFlag, faSchool, faUserAstronaut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "../../../layout/button/button"
import { useEffect } from 'react';
import './userInfo.scss';

interface UserInfoProps{
    request: any
    otherPhotosDestination: string
}

export function UserInfo({ request, otherPhotosDestination }: UserInfoProps) {
    useEffect(() => {
      
    }, [])
    
    return (
        <div className="user-request">
            <div className="user-request-img">
                <img src={`${otherPhotosDestination}/${request.username}/${request.photosLadies[0]?.path}`} alt={request.username} />
            </div>
            <div className="user-request-info">
                <div>
                    <span>{request.username} </span>
                    <span>{new Date().getFullYear() - request.dataOfBirth.slice(-4)}</span>
                </div>
                <div>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faHouseFlag} />
                            <span>{request.city}</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faSchool} />
                            <span>{request.ladyAbouts[0]?.educations}</span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <FontAwesomeIcon icon={faHeartCircleBolt} />
                            <span>{request.ladyAbouts[0]?.maritalStatus}</span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faUserAstronaut} />
                            <span>{request.ladyAbouts[0]?.profession}</span>
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
                    <Button type='submit' title={'Prihvati'} onClickFunction={undefined} />
                </div>
            </div>
        </div>
    )
}