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

    const [ user ] = useContext(UserContext) as any;
    const [ openAccount, setOpenAccount ] = useState(false);
    const [ unreadedMesssage, setUnreadedMessage ] = useState(0);
    const [ conversationRequest, setConversationRequest ] = useState(0) as any;
    const [ conversation, setConversation ] = useState();
    const [ openConversationRequest, setOpenConversationRequest ] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
      (async() => {
        const getUser = await apiRequest(`api/get/${user.role === 'lady' ? 'lady' : 'gentleman'}/${user.id}`, 'get', null, user.role);
        if(getUser.status === 'login') return navigate('/', {replace: true});
        // if(getUser.data.conversationRequest) setConversationRequest(getUser.data.conversationRequest);
        setConversationRequest([{
          "id" : 27,
          "username" : "Danka"
        },
        {
          "id": 28,
          "username": "Marija"
        }
      ])
        if(getUser.data.conversation) setConversation(getUser.data.conversation);
        console.log(getUser)
        const messageResponse = await apiRequest(`api/${user.id}/${user.role === 'lady' ? true : false}`, 'get', null, user.role);
        messageResponse.data.forEach((user: {unreadMessage: []}) => {
          if(user.unreadMessage) setUnreadedMessage((prev: number) => prev + user.unreadMessage.length);
        })
        console.log(messageResponse)
      })()
    }, [])
    
    
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
                <div className={unreadedMesssage === 0 ? 'hidden' : 'notification'}>
                  <span>{conversationRequest.length}</span>
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
            <ConversationRequest request={conversationRequest}/>
          </Modal>
        </div>
      </section>
    );
}