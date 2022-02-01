import Otheruser from "./Otheruser";
import Current from "./Currentuser";
import { useContext } from "react";
import { usercontext } from "../App";
export default function User({username,dp,bio,status,place,followers,following,priv}){
    // return <Otheruser username={username} bio={bio} dp={dp} place={place} status={status} followers={followers} following={following}>
    const context = useContext(usercontext)
    // </Otheruser>
        return username===context.user.username?<Current username={username} bio={bio} dp={dp} place={place}  followers={followers} following={following}/>:<Otheruser username={username} bio={bio} dp={dp} place={place} status={status} followers={followers} following={following} priv={priv}/>
}