import { Button, Modal } from 'antd'
import React from 'react'

import styles from './NewPasswordAcceptedModal.module.scss';
import './NewPasswordAcceptedModal.css';

interface NewPasswordAcceptedModalProps {
    isOpen: boolean,
    setIsOpen: Function,
    openSignIn: Function
}

export default function NewPasswordAcceptedModal({
    isOpen,
    setIsOpen,
    openSignIn
}: NewPasswordAcceptedModalProps) {
  return (
    <Modal
        title='Восстановление пароля'
        className={styles.modal}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
    >
        <p className={styles.modal__text}>Новый пароль отправлен на указанную почту</p>
        <Button className={styles.modal__openSignInButton} onClick={() => {
            setIsOpen(false)
            openSignIn(true)
        }}>Ввести пароль</Button>
    </Modal>
  )
}
