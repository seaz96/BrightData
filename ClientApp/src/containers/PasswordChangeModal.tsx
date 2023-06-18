import React from 'react'
import { PasswordChangeModal as BaseModal} from 'components';
import axios from 'axios';
import { userStore } from 'store';

interface PasswordChangeModalProps {
    isOpen: boolean,
    setIsOpen: Function,
}
  

const PasswordChangeModal:React.FC<PasswordChangeModalProps> = ({
    isOpen,
    setIsOpen,
  }) => {
    const submitFunction = async (values: any) => {
        try {
          // 👇️ const data: GetUsersResponse
          await axios.post(
            'http://localhost:5000/api/Auth/change-password',
            {
              login: values.login,
              oldPassword: values.oldPassword,
              newPassword: values.newPassword,
              confirmNewPassword: values.confirmNewPassword
            },
            {
              headers: {
                Authorization: "Bearer " + userStore.currentUser.token
              }
            }
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
              submitFunction={submitFunction}
          />
      )
}

export default PasswordChangeModal;