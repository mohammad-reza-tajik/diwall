import {UserType} from "@/db/userModel";
import profileData from "@/constants/profileData";

function Profile (user : UserType)  {

    return (
        <ul className={"flex flex-col p-7 rounded gap-10 bg-white"}>
            {
                profileData(user).map((data,index)=>{
                    return (
                        <li key={index} className={"flex items-center gap-2"}>
                            <span className={"text-sm md:text-base font-dana-bold"}>{data.key}</span>
                            <span className={"text-sm md:text-base"}>{data.value}</span>
                        </li>
                    )
                })
            }

        </ul>
    )
}

export default Profile