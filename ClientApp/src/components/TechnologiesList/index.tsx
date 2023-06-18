import React from 'react'

import styles from './TechnologiesList.module.scss';
import { Technology } from 'Types';

interface Props {
    technologies: Array<Technology>
}

const TechnologiesList: React.FC<Props> = ({ technologies }) => {
  return (
    <ul className={styles.technologyStackList}>
      {technologies.map(technology => 
          <li className={styles.technologyStackItem}>
              {technology.name}
          </li>
      )}
    </ul>
  )
}

export default TechnologiesList;