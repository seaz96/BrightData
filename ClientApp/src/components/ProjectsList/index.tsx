import React from 'react'

import styles from './ProjectsList.module.scss';
import { ProjectCard } from 'components';
import { Project } from 'Types';

interface ProjectListProps {
  projects: Array<Project>
}

const ProjectsList: React.FC<ProjectListProps> = ({projects}) => {
  return (
    <section className={styles.projectsList}>
        <ul className={styles.projectsList__list}>
          {projects != null && projects.map(project => 
             <li className={styles.projectsList__item}>
                <ProjectCard {...project}/>
              </li>
          )}
        </ul>
    </section>
  )
}

export default ProjectsList;