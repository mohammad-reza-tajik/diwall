export interface SignupActionParams {
    username : string;
    email : string;
    password: string;
}

export interface LoginActionParams {
    identifier : string;
    password : string;
}