import { Button, Form, Input, Modal } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react'

import styles from './SignInModal.module.scss';
import './SignInModal.css';

interface SignInModalProps {
  isOpen: boolean,
  setIsOpen: Function,
  openSignUp: Function,
  openPasswordRecovery: Function,
  submitFunction: Function
}

export default function SignInModal({
  isOpen,
  setIsOpen,
  openSignUp,
  openPasswordRecovery,
  submitFunction
}: SignInModalProps) {

  return (
    <Modal 
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        title='Авторизация'
        className={styles.modal}
    >
        <Form className={styles.modal__form} onFinish={(values: any) => submitFunction(values)}>
            <Form.Item 
              className={styles.modal__formItem}
              name="login"
            >
              <Input 
                prefix={<UserOutlined />}
                placeholder='Логин'
                className={styles.modal__input}
              />
            </Form.Item>
            <Form.Item
                style={{marginBottom: '0'}}
                className={styles.modal__formItem}
                name="password"
            >
                <Input 
                    prefix={<LockOutlined />}
                    type='password'
                    placeholder='Пароль'
                    className={styles.modal__input}
                />
            </Form.Item>
            <Button className={styles.modal__forgotPasswordButton} 
              onClick={() => {
                openPasswordRecovery(true)
                setIsOpen(false)
              }}>
                Забыли пароль?
            </Button>
            <Form.Item
              style={{marginBottom: '0'}}
              className={styles.modal__formItem}
            >
              <Button
                className={styles.modal__submitButton}
                htmlType='submit'
              >
                Войти
              </Button>
            </Form.Item>
            <p className={styles.modal__bottomLink}>Ещё нет аккаунта? 
              <Button className={styles.modal__openSignUpButton}
                  onClick = {() => {
                    setIsOpen(false);
                    openSignUp(true);
                  }}
              >
                Зарегистрируйтесь!
              </Button>
            </p>
        </Form>
    </Modal>
  )
}