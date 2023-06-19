import React from 'react'
import { UpdateProjectModal as BaseModal} from 'components'
import axios from 'axios';
import { userStore } from 'store';
import { Technology } from 'Types';

interface UpdateProjectModalProps {
    isOpen: boolean,
    setIsOpen: Function,
    projectId: string,
    name: string,
    photo: string,
    githubLink: string,
    technologies: Array<Technology>
}

const UpdateProjectModal:React.FC<UpdateProjectModalProps> = ({isOpen, setIsOpen, projectId, name,
  photo,
  githubLink,
  technologies}) => {
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
            'http://localhost:5000/api/Projects/update',
            {
                name: refactoredValues.name,
                githubLink: refactoredValues.githubLink,
                photo: refactoredValues.photo,
                technologies: refactoredValues.technologies,
                projectId: String(projectId)
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
          name={name}
          photo={photo}
          githubLink={githubLink}
          technologies={technologies}
        />
    )
}

export default UpdateProjectModal;