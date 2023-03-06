import { faArrowCircleLeft, faGift, faMessage, faXmark} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../../api/apiRequest';
import { UserContext } from '../../../context/user.context';
import { Button } from '../../layout/button/button';
import { Modal } from '../../modal/modal';
import './main.scss';
import { MessageRequest } from './messageRequest/messageRequest';
import { Shop } from './shop/shop';
import { ShowUser } from './showUser/showUser';

export function Main() {

    const [ user, setUser ] = useContext(UserContext) as any;
    const [ page, setPage ] = useState(1);
    const [ usersArray, setUsersArray ] = useState([]) as any;
    const [ display, setDisplay ] = useState(0);
    const [ end, setEnd ] = useState(false);
    const [ sendMessageReguest, setSendMessageRequest ] = useState(false);
    const [ shop, setShop ] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const role = user.role === 'gentleman' ? 'allLady' : 'allGentleman' ;
            const users = await apiRequest(`/api/get/${role}/${page}/${user.id}`, 'get', null, user.role);
            if(users.status === 'login') return navigate('/', {replace: true});
            setUsersArray((prev: any) => [...prev, ...users.data]);
        })()
    }, [page])

    function displayUser (value: number) {
        if(display + 2 === usersArray.length) setPage((prev: number) => prev + 1);
        if(value < 0 && display === 0) return;
        if(value < 0 && display > 0) return setDisplay((prev: number) => prev - 1);
        if(usersArray.length - 1 === display) return setEnd(true);
        setDisplay((prev: number) => prev + 1);
    }

    const showUserProps = {
        path: user.otherPhotosDestination,
        user: usersArray,
        display,
        end
    }
    
    return (
        <>
            <div className="main-container">
                {
                    usersArray.length > 0 ?
                        <div className="card">
                            <ShowUser {...showUserProps} zIndex={display % 2 === 0 ? 1 : 0} />
                            <ShowUser {...showUserProps} zIndex={(display + 1) % 2 === 0 ? 1 : 0}/>
                            <div className="user-info-button">
                                <Button implementClass='forward-button' title={<FontAwesomeIcon icon={faArrowCircleLeft} />} onClickFunction={() => displayUser(-1)} />
                                <Button implementClass='forward-button' title={<FontAwesomeIcon icon={faXmark} />} onClickFunction={() => displayUser(1)} />
                                <Button implementClass='forward-button' title={<FontAwesomeIcon icon={faMessage} />} onClickFunction={() => setSendMessageRequest(!sendMessageReguest)} />
                                <Button implementClass='forward-button' title={<FontAwesomeIcon icon={faGift} />} onClickFunction={() => setShop(!shop)} />
                            </div>
                        </div> : <h1>Loading!</h1>
                }
            </div>
            <Modal open={sendMessageReguest} close={() => setSendMessageRequest(!sendMessageReguest)}>
                <MessageRequest destination={usersArray[display]} />
            </Modal>
            <Modal open={shop} close={() => setShop(!shop)} >
                <Shop />
            </Modal>
        </>
    )
}