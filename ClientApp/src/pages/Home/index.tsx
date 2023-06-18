import React, { useState, useEffect } from 'react'

import {default as BasePage} from './Home';
import axios from 'axios';
import { Loader } from 'components';


interface HomeProps {
  setSignUpModalVisibility: Function,
  setAddProjectModalVisibility: Function,
}

export default function Home({
  setSignUpModalVisibility,
  setAddProjectModalVisibility
}: HomeProps) {
  const [projects, setProjects] = useState(null)

  async function getProjects(count: number)  {
    try {
      // 👇️ const data: GetUsersResponse
      const { data, status } = await axios.get(
        'http://localhost:5000/api/Projects/feed',
        {
          params: {
            count: count
          }
        },
      );

      if(!projects) setProjects(data.projects);
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
    getProjects(20)
  })

  if(!projects) return <Loader />

  return (
    <>
      <BasePage setSignUpModalVisibility={setSignUpModalVisibility}
       setAddProjectModalVisibility={setAddProjectModalVisibility} 
       projects={projects}/>
    </>
  )
}
