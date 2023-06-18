import React, { useState } from 'react'

import styles from './Profile.module.scss';
import { ProfileCard, ProjectsList } from 'components';
import { EditProfileModal, PasswordChangeModal } from 'containers';
import { userData } from 'Types';

interface ProfileProps {
  userData: userData
}

const Profile:React.FC<ProfileProps> = ({userData}) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

  return (
    <div className={styles.profile}>
      <ProfileCard 
        userData={userData}
        setModalOpen={setEditModalOpen}
      />
      <ProjectsList projects={[{
        "authorID": "0",
        "name": "Lol",
        "description": "Hehe",
        "technologies": [{id:"0", name: "Javascript"}],
        "githubLink": "github.com",
        "likes": 234,
        "photo": "123",
        "id": 1
      }]}/>
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        setIsOpen={setEditModalOpen} 
        userData={userData} 
        setPasswordModalOpen={setPasswordModalOpen}
      />
      <PasswordChangeModal isOpen={isPasswordModalOpen} setIsOpen={setPasswordModalOpen} />
    </div>
  )
}

export default Profile;