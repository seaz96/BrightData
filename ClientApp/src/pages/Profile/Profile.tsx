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
      <ProjectsList projects={userData.projects} technologiesFilter={[]}/>
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