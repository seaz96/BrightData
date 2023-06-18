import React, { useEffect, useState } from 'react'
import { Technology } from 'Types';
import { ProjectCard as BaseCard } from 'components';
import axios from 'axios';
import { userStore } from 'store';


interface ProjectCardProps 
{
  likeState?: boolean,
  authorID: string,
  name: string,
  description: string,
  technologies: Array<Technology>,
  githubLink: string,
  likes: number,
  photo: string,
  id: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  likeState,
  authorID,
  name,
  description,
  technologies,
  githubLink,
  likes,
  photo,
  id
}) => {
    const [user, setUser] = useState(null)
    
    async function getUser()  {
      try {
        const { data, status } = await axios.get(
          'http://localhost:5000/api/users/id/' + authorID
        );

        if(!user) setUser(data);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
          return null;
        } else {
          console.log('unexpected error: ', error);
          return null;
        }
      }
    } 

    async function likeProject()  {
      try {
        const { data, status } = await axios.post(
          'http://localhost:5000/api/Projects/like',
          {
            projectId: String(id)
          },
          {
            headers: {
              Authorization: "Bearer " + userStore.currentUser.token
            }
          }
        );

        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
          return null;
        } else {
          console.log('unexpected error: ', error);
          return null;
        }
      }
    } 

    async function dislikeProject()  {
      try {
        const { data, status } = await axios.post(
          'http://localhost:5000/api/Projects/dislike',
          {
            projectId: String(id)
          },
          {
            headers: {
              Authorization: "Bearer " + userStore.currentUser.token
            }
          }
        );

        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error);
          return null;
        } else {
          console.log('unexpected error: ', error);
          return null;
        }
      }
    } 

    

    useEffect(() => {
        getUser()
    })


    if(user) {
        return (
            <BaseCard
                likeState={likeState}
                authorID={authorID}
                authorName={user.name ? user.name : user.login}
                name={name}
                description={description}
                technologies={technologies}
                githubLink={githubLink}
                likes={likes}
                photo={photo}
                id={id}
                likeProject={likeProject}
                dislikeProject={dislikeProject}
            />
        )
    } 
}

export default ProjectCard;