import React, { useState } from 'react'
import { Button, Dropdown, MenuProps } from 'antd';
import { HeartOutlined, HeartFilled, UserOutlined, EllipsisOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { TechnologiesList } from 'components';
import { UpdateProjectModal } from 'containers';

import styles from './ProjectCard.module.scss';
import LinkIcon from 'assets/Link.svg';
import classNames from 'classnames';
import { Technology } from 'Types';
import { userStore } from 'store';
import { Link, useLocation } from 'react-router-dom';


interface ProjectCardProps 
{
  name: string,
  authorID: string,
  technologies: Array<Technology>,
  githubLink: string,
  likes: number,
  photo: string,
  likeProject: Function,
  dislikeProject: Function,
  id: string,
  isLiked : boolean,
  authorLogin: string,
  authorName: string,
  deleteProject: Function
}



const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  technologies,
  authorID,
  githubLink,
  likes,
  photo,
  likeProject,
  dislikeProject,
  id,
  isLiked,
  authorLogin,
  deleteProject,
  authorName
}) => {
  const [likeState, setlikeState] = useState(isLiked);
  const [isUpdateProjectModalOpen, setUpdateProjectModalOpen] = useState(false);

  const isInProfile = useLocation().pathname === "/profile/" + authorID;

  const dropdownItems: MenuProps['items'] = [
    {
      key: '1',
      icon: <CloseOutlined />,
      label: "Удалить проект",
      onClick: () => deleteProject()
    },
    {
      key: '2',
      icon: <EditOutlined />,
      label: "Редактировать проект",
      onClick: () => setUpdateProjectModalOpen(true)
    }
  ];

  return (
    <>
    <article className={styles.projectCard}>
      <header className={styles.projectCard__header}>
        <Link to={'/profile/' + authorID} className={styles.projectCard__person}>
          <UserOutlined className={styles.projectCard__personImg} alt='person'/>
          <span className={styles.projectCard__personName}>{authorName ? authorName : authorLogin}</span>
        </Link>
        <Button 
          className={classNames(styles.projectCard__likes, likeState ? styles.projectCard__likes_liked : '')}
          icon={likeState ? <HeartFilled /> : <HeartOutlined />}
          disabled={userStore.currentUser ? false : true}
          onClick={() => {
            if(!likeState) likeProject(id)
            else dislikeProject(id)
            setlikeState(!likeState)
          }}
        >
          {likeState ? likes + 1 : likes}
        </Button>
        {isInProfile && userStore.currentUser && authorID === userStore.currentUser.id && 
        <Dropdown 
          menu={{ items: dropdownItems }}  
          trigger={['click']} 
          overlayClassName={styles.mainHeader__userDropdown}
        >
          <Button 
            icon={<EllipsisOutlined />}
            className={styles.projectCard__actionButton}
          />
        </Dropdown>
        }
      </header>
      <main>
        <img src={photo} className={styles.projectCard__logo} alt='project logo'/>
        <div className={styles.projectCard__infoContainer}>
          <p className={styles.projectCard__link}>
            <img src={LinkIcon} className={styles.projectCard__linkImg} alt='project link'/>
            <a href='https://' className={styles.projectCard__linkText}>{githubLink}</a>
          </p>
          <p className={styles.projectCard__text}>
            {name}
          </p>
          <TechnologiesList technologies={technologies}/>
        </div>
      </main>
    </article>
    <UpdateProjectModal 
      name={name}
      technologies={technologies}
      projectId={id} 
      githubLink={githubLink}
      photo={photo}
      isOpen={isUpdateProjectModalOpen} 
      setIsOpen={setUpdateProjectModalOpen} 
    />
    </>
  )
}

export default ProjectCard;