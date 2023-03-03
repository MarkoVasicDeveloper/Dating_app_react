import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react"
import { UserContext } from "../../context/user.context"
import { Button } from "../layout/button/button";
import { faUser, faSearch, faGift, faMessage, faLink } from "@fortawesome/free-solid-svg-icons";
import './home.scss';
import { library } from "@fortawesome/fontawesome-svg-core";
import { AccountButton } from "./accountButton/accountButton";
import { Main } from "./main/main";

library.add(faUser, faSearch, faGift, faMessage);

export function Home() {

    const [ user ] = useContext(UserContext) as any;

    useEffect(() => {
      // console.log(user)
    }, [])
    
    
    return (
      <section id="home">
        <div className="bar">
          <div className="nav">
            <nav>
              <AccountButton title={user.username} icon={<FontAwesomeIcon icon={faUser} />} onClick={undefined} />
              <div className="otherButtons">
                <Button titleFusnote="Pretrazi" implementClass="iconButtons" onClickFunction={undefined} title={<FontAwesomeIcon icon={faSearch} />}  />
                <Button titleFusnote="Posalji poklon" implementClass="iconButtons" onClickFunction={undefined} title={<FontAwesomeIcon icon={faGift} />}  />
                <div className="notification">
                  <span>{9}</span>
                  <Button titleFusnote="Poruke" implementClass="iconButtons" onClickFunction={undefined} title={<FontAwesomeIcon icon={faMessage} />}  />
                </div>
                <div className="notification">
                  <span>{990}</span>
                  <Button titleFusnote="Zahtevi za dopisivanje" implementClass="iconButtons" onClickFunction={undefined} title={<FontAwesomeIcon icon={faLink} />}  />
                </div>
              </div>
            </nav>
          </div>
          <div className="bar-content"></div>
        </div>
        <div className="main">
          <Main />
        </div>
      </section>
    );
}