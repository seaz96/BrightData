import React from 'react'
import { PasswordRecoveryModal as BaseModal} from 'components';
import axios from 'axios';

interface PasswordRecoveryModalProps {
    isOpen: boolean,
    setIsOpen: Function,
    openSignIn: Function,
    openNewPasswordAccepted: Function
}
  

const PasswordRecoveryModal:React.FC<PasswordRecoveryModalProps> = ({
    isOpen,
    setIsOpen,
    openSignIn,
    openNewPasswordAccepted
  }) => {
    const submitFunction = async (values: any) => {
        try {
          // 👇️ const data: GetUsersResponse
          await axios.post(
            'http://localhost:5000/api/Auth/recover-password',
            {
              login: values.login,
              email: values.email
            },
          );    
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
              openSignIn={openSignIn}
              openNewPasswordAccepted={openNewPasswordAccepted}
              submitFunction={submitFunction}
          />
      )
}

export default PasswordRecoveryModal;