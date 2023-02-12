import { useContext, useEffect } from "react"
import { UserContext } from "../../context/user.context"

export function Home() {

    const [ user ] = useContext(UserContext);

    useEffect(() => {
      console.log(user)
    }, [])
    
    
    return <h1>Hello from Home component</h1>
}