const storeTokenAndUser = (user) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem("userId", user.userId)
        localStorage.setItem("username", user.username)
        localStorage.setItem("token", user.token)
    }
}

export default storeTokenAndUser