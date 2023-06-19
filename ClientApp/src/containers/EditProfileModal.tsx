import React from 'react'
import { EditProfileModal as BaseModal} from 'components'
import axios from 'axios';
import { userStore } from 'store';
import { userData } from 'Types';

interface EditProfileModalProps {
    isOpen: boolean,
    setIsOpen: Function,
    userData: userData,
    setPasswordModalOpen: Function
}

const EditProfileModal:React.FC<EditProfileModalProps> = ({isOpen, setIsOpen, setPasswordModalOpen, userData}) => {
    const submitFunction = async (values: any) => {
        try {
          const refactoredValues = {
            email: values.email ? values.email : "",
            name: values.name ? values.name : "",
            vkLink: values.vkLink ? values.vkLink : "",
            telegramLink: values.telegramLink ? values.telegramLink : "",
            description: values.description ? values.description : "",
            photo: values.photo ? values.photo : "" 
          }

          await axios.post(
            'http://localhost:5000/api/users/update',
            {
                ...refactoredValues
            },
            {
              headers: {
                Authorization: "Bearer " + userStore.currentUser.token
              }
            }
          );    

          userStore.setUserData({...userStore.userData, ...values})
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
        <BaseModal userData={userData} isOpen={isOpen} setIsOpen={setIsOpen} submitFunction={submitFunction} setPasswordModalOpen={setPasswordModalOpen}/>
    )
}

export default EditProfileModal