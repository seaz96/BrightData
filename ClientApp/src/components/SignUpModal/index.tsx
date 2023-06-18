import { Button, Form, Input, Modal } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react'

import styles from './SignUpModal.module.scss';
import './SignUpModal.css';

interface SignUpModalProps {
  isOpen: boolean,
  setIsOpen: Function
  openSignIn: Function
  submitFunction: Function
}

export default function SignUpModal({
  isOpen,
  setIsOpen,
  openSignIn,
  submitFunction
}: SignUpModalProps) {

  return (
    <Modal 
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        title='Регистрация'
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
              className={styles.modal__formItem}
              name="email"
            >
              <Input 
                prefix={<MailOutlined />}
                placeholder='E-Mail'
                className={styles.modal__input}
              />
            </Form.Item>
            <Form.Item 
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
            <Form.Item 
              className={styles.modal__formItem}
              name="passwordConfirm"
            >
              <Input 
              prefix={<LockOutlined />}
                type='password'
                placeholder='Повторите пароль'
                className={styles.modal__input}
              />
            </Form.Item>
            <Form.Item
              style={{marginBottom: '0'}}
              className={styles.modal__formItem}
            >
              <Button
                className={styles.modal__submitButton}
                htmlType='submit'
              >
                Зарегистрироваться
              </Button>
            </Form.Item>
            <p className={styles.modal__bottomLink}>У вас уже есть аккаунт? 
              <Button className={styles.modal__openSignInButton} onClick={() => {
                setIsOpen(false)
                openSignIn(true)
              }}>
                Войдите!
              </Button>
            </p>
        </Form>
    </Modal>
  )
}
