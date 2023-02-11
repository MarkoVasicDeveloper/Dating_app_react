import ReactDom from "react-dom";
import { Button } from "../layout/button/button";
import './modal.scss';

interface ModalProps {
    open: boolean,
    children: any,
    close: any
}

export function Modal ({ open, children, close } : ModalProps) {

    if(!open) return null;
    
    return ReactDom.createPortal(
        <section id="modal">
            <Button title="Close" onClickFunction={close} implementClass="fixed" />
            <div className="modal-content">
                {children}
            </div>
        </section>,
        document.getElementById('portal') as any
    )
}