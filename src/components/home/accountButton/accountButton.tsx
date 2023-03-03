import './accountButton.scss';
import { Button } from "../../layout/button/button";

interface accountProps{
    title: string
    icon: any
    onClick: any
}

export function AccountButton(data: accountProps) {
    return (
        <div className="user">
            <span> {data.icon} </span>
            <Button title={data.title} onClickFunction={data.onClick} />
        </div>
    )
}