import React from 'react'
import { AddNewProjectModal as BaseModal} from 'components'
import axios from 'axios';
import { userStore } from 'store';
import { userData } from 'Types';

interface AddNewProjectModalProps {
    isOpen: boolean,
    setIsOpen: Function,
}

const AddNewProjectModal:React.FC<AddNewProjectModalProps> = ({isOpen, setIsOpen}) => {
    const submitFunction = async (values: any) => {
        try {
          const refactoredValues = {
            name: values.name ? values.name : "",
            githubLink: values.githubLink ? values.githubLink : "",
            photo: values.photo ? values.photo : "",
            technologies: values.technologies ? 
              values.technologies.map((technology: string, index: number) => {
                return {
                  name: technology,
                  id: String(index)
                }
              })
              : []
          }

          await axios.post(
            'http://localhost:5000/api/Projects/add',
            {
                name: refactoredValues.name,
                githubLink: refactoredValues.githubLink,
                photo: refactoredValues.photo,
                technologies: refactoredValues.technologies
            },
            {
              headers: {
                Authorization: "Bearer " + userStore.currentUser.token
              }
            }
          );    

          userStore.setUserData(values)
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
        <BaseModal isOpen={isOpen} setIsOpen={setIsOpen} submitFunction={submitFunction}/>
    )
}

export default AddNewProjectModal;