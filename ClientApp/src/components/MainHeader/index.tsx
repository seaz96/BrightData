import React from 'react'
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';

import styles from './MainHeader.module.scss';
import './MainHeader.css';
import Logo from 'assets/Logo.svg';
import Exit from 'assets/Exit.svg';
import type { User } from 'Types';
import { Link } from 'react-router-dom';
import { userStore } from 'store';

interface MainHeaderProps {
  user?: User,
  openSignUpModal: Function,
  openAddProjectModal: Function
}

export default function MainHeader({
  user,
  openSignUpModal,
  openAddProjectModal
}: MainHeaderProps) {

  const dropdownItems: MenuProps['items'] = [
    {
      key: '1',
      icon: <PlusOutlined />,
      label: "Разместить проект",
      onClick: () => openAddProjectModal(true)
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: (
        <Link to={"/profile/" + user?.id}>
          Мой профиль
        </Link>
      ),
    },
    {
      key: '3',
      icon: <img src={Exit} alt='exit'/>,
      label: 'Выйти',
      onClick: () => userStore.setCurrentUser(null)
    },
  ];
  return (
    <header className={styles.mainHeader}>
      <Link to="/" className={styles.mainHeader__logoContainer}>
        <img src={Logo} alt='logo'/>
      </Link>
      <Button className={styles.mainHeader__authButton} onClick={user ? () => {} : () => openSignUpModal(true)}>
        <UserOutlined />
        {
          user ?
          <Dropdown 
            menu={{ items: dropdownItems }}  
            trigger={['click']} 
            overlayClassName={styles.mainHeader__userDropdown}
          >
            <p>{user.login}</p>
          </Dropdown>
          :
          <p>Войти</p>
        }
      </Button>
    </header>
  )
}
