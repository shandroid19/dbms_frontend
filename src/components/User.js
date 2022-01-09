import Otheruser from "./Otheruser";
import Current from "./Currentuser";
export default function User({username,dp,bio,status,place,followers,following}){
    // return <Otheruser username={username} bio={bio} dp={dp} place={place} status={status} followers={followers} following={following}>

    // </Otheruser>
        return <Current username={username} bio={bio} dp={dp} place={place}  followers={followers} following={following}>

    </Current>
}