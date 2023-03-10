import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/user.context"
import { Button } from "../layout/button/button";
import { faUser, faSearch, faGift, faMessage, faLink } from "@fortawesome/free-solid-svg-icons";
import './home.scss';
import { library } from "@fortawesome/fontawesome-svg-core";
import { AccountButton } from "./accountButton/accountButton";
import { Main } from "./main/main";
import { Modal } from "../modal/modal";
import { Account } from "./account/account";
import { apiRequest } from "../../api/apiRequest";
import { useNavigate } from "react-router-dom";
import { ConversationRequest } from "./conversationRequest/conversationRequest";

library.add(faUser, faSearch, faGift, faMessage);

export function Home() {

    const [ user, setUser ] = useContext(UserContext) as any;

    const [ openAccount, setOpenAccount ] = useState(false);
    const [ unreadedMesssage, setUnreadedMessage ] = useState(0);
    const [ conversationRequest, setConversationRequest ] = useState(0) as any;
    const [ conversation, setConversation ] = useState();
    const [ openConversationRequest, setOpenConversationRequest ] = useState(false);
    const [ requestInfo, setRequestInfo ] = useState([]) as any;

    const navigate = useNavigate();

    useEffect(() => {
      (async() => {
        const getUser = await apiRequest(`api/get/${user.role === 'lady' ? 'lady' : 'gentleman'}/${user.id}`, 'get', null, user.role);
        if(getUser.status === 'login') return navigate('/', {replace: true});
        if(getUser.data.conversationRequest) {
          
          getUser.data.conversationRequest.forEach(async (req: {id: number, username: string}) => {
            console.log(req)
            if(!req) return;
            const users = await apiRequest(`api/get/${user.role === 'lady' ? 'gentleman' : 'lady'}/${req.id}`, 'get', null, user.role);
            if(users.data.status === 'error') return;
            setRequestInfo((prev: any) => [...prev, users.data]);
          })
          setConversationRequest(getUser.data.conversationRequest.filter((request:any) => request !== null).length);
        }
        
        if(getUser.data.conversation) setConversation(getUser.data.conversation);
      
        const messageResponse = await apiRequest(`api/${user.id}/${user.role === 'lady' ? true : false}`, 'get', null, user.role);
        messageResponse.data.forEach((user: {unreadMessage: []}) => {
          if(user.unreadMessage) setUnreadedMessage((prev: number) => prev + user.unreadMessage.length);
        })
      })()
    }, []);

    function removeRequest(index: number) {
      setConversationRequest((prev: number) => prev - 1);
      requestInfo.splice(index, 1)
    }
    
    return (
      <section id="home">
        <div className="bar">
          <div className="nav">
            <nav>
              <AccountButton title={user.username} icon={<FontAwesomeIcon icon={faUser} />} onClick={() => setOpenAccount(!openAccount)} />
              <div className="otherButtons">
                <Button titleFusnote="Pretrazi" implementClass="iconButtons" onClickFunction={undefined} title={<FontAwesomeIcon icon={faSearch} />}  />
                <Button titleFusnote="Posalji poklon" implementClass="iconButtons" onClickFunction={undefined} title={<FontAwesomeIcon icon={faGift} />}  />
                <div className={unreadedMesssage === 0 ? 'hidden' : 'notification'}>
                  <span>{unreadedMesssage}</span>
                  <Button titleFusnote="Poruke" implementClass="iconButtons" onClickFunction={undefined} title={<FontAwesomeIcon icon={faMessage} />}  />
                </div>
                <div className={conversationRequest === 0 ? 'hidden' : 'notification'}>
                  <span>{conversationRequest}</span>
                  <Button titleFusnote="Zahtevi za dopisivanje" implementClass="iconButtons" onClickFunction={() => setOpenConversationRequest(!openConversationRequest)} title={<FontAwesomeIcon icon={faLink} />}  />
                </div>
              </div>
            </nav>
          </div>
          <div className="bar-content"></div>
        </div>
        <div className="main">
          <Main />
          <Modal open={openAccount} close={() => setOpenAccount(!openAccount)} >
            <Account />
          </Modal>
          <Modal open={openConversationRequest} close={() => setOpenConversationRequest(!openConversationRequest)}>
            <ConversationRequest remove={removeRequest} request={requestInfo}/>
          </Modal>
        </div>
            <button onClick={() => console.log(requestInfo)}>sss</button>
      </section>
    );
}