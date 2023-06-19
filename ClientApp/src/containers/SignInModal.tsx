import React from 'react'
import { SignInModal as BaseModal } from 'components';
import axios from 'axios';
import { userStore } from 'store';
import { User } from 'Types';

interface SignInModalProps {
    isOpen: boolean,
    setIsOpen: Function,
    openSignUp: Function,
    openPasswordRecovery: Function
}

const SignInModal: React.FC<SignInModalProps> = ({isOpen, setIsOpen, openSignUp, openPasswordRecovery}) => {

    const submitFunction = async (values: any) => {
      try {
        // 👇️ const data: GetUsersResponse
        const { data, status } = await axios.post<User>(
          'http://localhost:5000/api/Auth/login',
          {
            login: values.login,
            password: values.password
          },
        );
    
        localStorage.setItem('user', JSON.stringify(data))
        userStore.setCurrentUser(data)
        setIsOpen(false)
    
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
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
            openSignUp={openSignUp}
            openPasswordRecovery={openPasswordRecovery}
            submitFunction={submitFunction}
        />
    )
}

export default SignInModal;