import axios from 'axios';

type RegisterUserArgs = {
    login: string,
    password: string,
    email: string,
    passwordConfirm: string
}

const RegisterUser: Function = (params: RegisterUserArgs) => 
    axios.get("backend/Auth/register", {
        params: params
    })

export default RegisterUser;