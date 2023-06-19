import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import styles from './App.module.scss';
import { Home, Profile } from 'pages';
import { MainFooter, MainHeader, NewPasswordAcceptedModal } from 'components';
import { SignInModal, SignUpModal, PasswordRecoveryModal, AddNewProjectModal } from 'containers';
import { observer } from 'mobx-react-lite';
import { userStore } from 'store';

function App() {
  const [isSignUpModalVisible, setSignUpModalVisibility] = useState(false)
  const [isSignInModalVisible, setSignInModalVisibility] = useState(false)
  const [isPasswordRecoveryModalVisible, setPasswordRecoveryModalVisibility] = useState(false)
  const [isNewPasswordAcceptedModalVisible, setNewPasswordAcceptedModalVisibility] = useState(false);
  const [isAddProjectModalVisible, setAddProjectModalVisibility] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      userStore.setCurrentUser(foundUser);
    }
  }, [])

  return (
  <div className={styles.app}>
    <div className={styles.container}>
      <MainHeader openSignUpModal={setSignInModalVisibility} user={userStore.currentUser} openAddProjectModal={setAddProjectModalVisibility}/>
      <div className={styles.content}></div>
      <Routes>
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<Home setSignUpModalVisibility={setSignInModalVisibility} 
        setAddProjectModalVisibility={setAddProjectModalVisibility}/>} />
      </Routes>
      <MainFooter openSignUpModal={setSignInModalVisibility} user={userStore.currentUser} openAddProjectModal={setAddProjectModalVisibility}/>
    </div>

    {/*  MODALS */}
    <SignUpModal 
      isOpen={isSignUpModalVisible} 
      setIsOpen={setSignUpModalVisibility} 
      openSignIn={setSignInModalVisibility}
    />
    <SignInModal
      isOpen={isSignInModalVisible} 
      setIsOpen={setSignInModalVisibility} 
      openSignUp={setSignUpModalVisibility}
      openPasswordRecovery={setPasswordRecoveryModalVisibility}
    />
    <PasswordRecoveryModal 
      isOpen={isPasswordRecoveryModalVisible}
      setIsOpen={setPasswordRecoveryModalVisibility}
      openSignIn={setSignInModalVisibility}
      openNewPasswordAccepted={setNewPasswordAcceptedModalVisibility}
    />
    <NewPasswordAcceptedModal 
      isOpen={isNewPasswordAcceptedModalVisible}
      setIsOpen={setNewPasswordAcceptedModalVisibility}
      openSignIn={setSignInModalVisibility}
    />
    <AddNewProjectModal
      isOpen={isAddProjectModalVisible}
      setIsOpen={setAddProjectModalVisibility}
    />
  </div>
  );
}

export default observer(App);
