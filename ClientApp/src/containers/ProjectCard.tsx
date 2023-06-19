import React, { useEffect, useState } from 'react'
import { Technology } from 'Types';
import { ProjectCard as BaseCard } from 'components';
import axios from 'axios';
import { userStore } from 'store';


interface ProjectCardProps 
{
  authorID: string,
  name: string,
  technologies: Array<Technology>,
  githubLink: string,
  likes: number,
  photo: string,
  id: string
  isLiked : boolean,
  authorLogin: string,
  authorName: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  authorID,
  name,
  technologies,
  githubLink,
  likes,
  photo,
  id,
  isLiked,
  authorLogin,
  authorName
}) => {
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

    async function deleteProject() {
      try {
        const { data, status } = await axios.post(
          'http://localhost:5000/api/Projects/delete',
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

    return (
        <BaseCard
            name={name}
            technologies={technologies}
            githubLink={githubLink}
            likes={likes}
            authorID={authorID}
            photo={photo}
            id={id}
            isLiked={isLiked}
            authorName={authorName}
            authorLogin={authorLogin}
            likeProject={likeProject}
            dislikeProject={dislikeProject}
            deleteProject={deleteProject}
        />
    )
}

export default ProjectCard;