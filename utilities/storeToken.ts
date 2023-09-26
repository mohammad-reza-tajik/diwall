import {User} from "@/store/userSlice";

const storeTokenAndUser = (user : User) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem("_id", user._id)
        localStorage.setItem("username", user.username)
        localStorage.setItem("token", user.token)
    }
}

export default storeTokenAndUser