import React from 'react'
import { SignUpModal as BaseModal } from 'components';
import axios from 'axios';
import { userStore } from 'store';
import {User} from 'Types';

interface SignUpModalProps {
    isOpen: boolean,
    setIsOpen: Function,
    openSignIn: Function,
}

const SignUpModal: React.FC<SignUpModalProps> = ({isOpen, setIsOpen, openSignIn}) => {

    const submitFunction = async (values: any) => {
        try {
            // 👇️ const data: GetUsersResponse
            const { data, status } = await axios.post<User>(
              'http://localhost:5000/api/Auth/register',
              {
                login: values.login,
                password: values.password,
                email: values.email,
                passwordConfirm: values.passwordConfirm
              },
            );
            
            localStorage.setItem('user', JSON.stringify(data))
            userStore.setCurrentUser(data)
            setIsOpen(false)
            
            return data;
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log('error message: ', error);
              return error.message;
            } else {
              console.log('unexpected error: ', error);
              return 'An unexpected error occurred';
            }
          }

    };
      

    return (
        <BaseModal 
            isOpen={isOpen} 
            setIsOpen={setIsOpen} 
            openSignIn={openSignIn}
            submitFunction={submitFunction}
        />
    )
}

export default SignUpModal;