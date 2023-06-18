import React from 'react'

import { Advertising, Filter, ProjectsList} from 'components';
import styles from './Home.module.scss';
import { Project } from 'Types';


interface HomeProps {
  setSignUpModalVisibility: Function,
  setAddProjectModalVisibility: Function,
  projects: Array<Project>,
}

export default function Home({
  setSignUpModalVisibility,
  setAddProjectModalVisibility,
  projects
}: HomeProps) {
  
  return (
    <>
      <div className={styles.home}>
        <Advertising openSignUpModal={setSignUpModalVisibility} setAddProjectModalVisibility={setAddProjectModalVisibility}/>
        <Filter />
        <ProjectsList projects={projects}/>
      </div>
    </>
  )
}
