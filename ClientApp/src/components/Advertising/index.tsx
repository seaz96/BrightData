import React from 'react'
import MediaQuery from 'react-responsive';

import styles from './Advertising.module.scss';
import LogoText from 'assets/LogoText.svg';
import { userStore } from 'store';

interface AdvertisingProps {
  openSignUpModal: Function,
  setAddProjectModalVisibility: Function
}

export default function Advertising({
  openSignUpModal,
  setAddProjectModalVisibility
}: AdvertisingProps) {
  return (
    <section className={styles.advertising}>
        <MediaQuery minWidth={786}>
            <img src={LogoText} className={styles.advertising__logoText}/>
        </MediaQuery>
        <div className={styles.advertising__contentContainer}>
            <p className={styles.advertising__text}>
                Создана для программистов со всего мира. 
                Общайся и делись знаниями с коллегами из разных уголков планеты, 
                получай новые идеи и решения для своих проектов. 
                Присоединяйся к нам и становись частью сообщества бесконечных возможностей!
            </p>
            {
              userStore.currentUser ? 
              <button 
                className={styles.advertising__projectButton} 
                onClick={() => {
                  setAddProjectModalVisibility(true)            
                }}
              >
                Разместить проект
              </button>
              :
              <button 
                className={styles.advertising__joinButton} 
                onClick={() => {
                  openSignUpModal(true)            
                }}
              >
                Присоединяйся
              </button>
            }    
        </div>
    </section>
  )
}
