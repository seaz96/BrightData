import React from 'react'

import styles from './ProjectsList.module.scss';
import { ProjectCard } from 'containers';
import { Project } from 'Types';
import { IsProjectContainsFilteredStack } from 'uitls';

interface ProjectListProps {
  projects: Array<Project>,
  technologiesFilter: Array<string>
}

const ProjectsList: React.FC<ProjectListProps> = ({projects, technologiesFilter}) => {
  let filteredProjects: Array<Project>;
  if(technologiesFilter.length) {
    filteredProjects = projects.filter(project => IsProjectContainsFilteredStack(technologiesFilter, project))
  }

  return (
    <section className={styles.projectsList}>
        <ul className={styles.projectsList__list}>
          {
            projects && 
              filteredProjects ? 
              filteredProjects.map(project => 
                <li className={styles.projectsList__item}>
                  <ProjectCard {...project}/>
                </li>
              )
              :
              projects.map(project => 
                  <li className={styles.projectsList__item}>
                    <ProjectCard {...project}/>
                  </li>    
              )
          }
        </ul>
    </section>
  )
}

export default ProjectsList;