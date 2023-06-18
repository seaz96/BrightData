import React, { useState } from 'react'
import { Button } from 'antd';
import { HeartOutlined, HeartFilled, UserOutlined } from '@ant-design/icons';
import { TechnologiesList } from 'components';

import styles from './ProjectCard.module.scss';
import Link from 'assets/Link.svg';
import ProjectCardLogo from 'assets/projectCardLogo.png';
import classNames from 'classnames';
import { Technology } from 'Types';


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
  const [isLiked, setIsLiked] = useState(likeState);

  return (
    <article className={styles.projectCard}>
      <header className={styles.projectCard__header}>
        <p className={styles.projectCard__person}>
          <UserOutlined className={styles.projectCard__personImg} alt='person'/>
          <span className={styles.projectCard__personName}>alexcoder007</span>
        </p>
        <Button 
          className={classNames(styles.projectCard__likes, isLiked ? styles.projectCard__likes_liked : '')}
          icon={isLiked ? <HeartFilled /> : <HeartOutlined />}
          onClick={() => setIsLiked(!isLiked)}
        >
          {isLiked ? likes + 1 : likes}
        </Button>
      </header>
      <main>
        <img src={ProjectCardLogo} className={styles.projectCard__logo} alt='project logo'/>
        <div className={styles.projectCard__infoContainer}>
          <p className={styles.projectCard__link}>
            <img src={Link} className={styles.projectCard__linkImg} alt='project link'/>
            <a href='/' className={styles.projectCard__linkText}>github</a>
          </p>
          <p className={styles.projectCard__text}>
            CodeCraft: разработка инновационных решений с использованием передовых технологий
          </p>
          <TechnologiesList technologies={technologies}/>
        </div>
      </main>
    </article>
  )
}

export default ProjectCard;