import React from 'react'
import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';

import styles from './MainFooter.module.scss';
import Logo from 'assets/Logo.svg';
import Exit from 'assets/Exit.svg';
import type { User } from 'Types';
import { Link } from 'react-router-dom';
import { userStore } from 'store';


const dropdownItems: MenuProps['items'] = [
    {
      key: '1',
      icon: <PlusOutlined />,
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Разместить проект
        </a>
      ),
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: (
        <Link to="/profile">
          Мой профиль
        </Link>
      ),
    },
    {
      key: '3',
      icon: <img src={Exit} alt='exit'/>,
      label: 'Выйти',
    },
  ];

interface MainFooterProps {
    user?: User,
    openSignUpModal: Function,
    openAddProjectModal: Function
}

export default function MainFooter({
    user,
    openSignUpModal,
    openAddProjectModal
}: MainFooterProps) {
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
        <Link to="/profile">
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
    <footer className={styles.mainFooter}>
        <div className={styles.mainFooter__top}>
            <Link className={styles.mainFooter__logoContainer} to="/">
                <img src={Logo} alt='logo'/>
            </Link>
            <Button className={styles.mainFooter__authButton} onClick={user ? () => {} : () => openSignUpModal(true)}>
              <UserOutlined />
              {
              user ?
                  <Dropdown menu={{ items: dropdownItems }} overlayClassName={styles.mainFooter__userDropdown}>
                      <p>{user.login}</p>
                  </Dropdown>
              :
                  <p>Войти</p>
              }
            </Button>
        </div>
        <div className={styles.mainFooter__bottom}>
            <ul className={styles.mainFooter__linksList}>
                <li className={styles.mainFooter__link}>
                    Настройки Cookies
                </li>
                <li className={styles.mainFooter__link}>
                    Обработка персональных данных
                </li>
                <li className={styles.mainFooter__link}>
                    Политика конфиденциальности
                </li>
            </ul>
            <p className={styles.mainFooter__copyright}>brightdata.com © 2023. All rights reserved.</p>
        </div>
    </footer>
  )
}
