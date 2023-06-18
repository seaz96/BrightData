import { Button, Form, Input, Modal } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react'

import styles from './PasswordChangeModal.module.scss';

interface PasswordChangeModal {
  isOpen: boolean,
  setIsOpen: Function,
  submitFunction: Function
}

const PasswordChangeModal:React.FC<PasswordChangeModal> = ({
  isOpen,
  setIsOpen,
  submitFunction
}) => {

  return (
    <Modal 
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        title='Смена пароля'
        className={styles.modal}
    >
        <Form className={styles.modal__form} onFinish={(values: any) => submitFunction(values)}>
            <Form.Item 
              className={styles.modal__formItem}
              name="login"
            >
              <Input 
                prefix={<UserOutlined />}
                type='password'
                placeholder='Логин'
                className={styles.modal__input}
              />
            </Form.Item>
            <Form.Item 
              className={styles.modal__formItem}
              name="oldPassword"
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
              name="newPassword"
            >
              <Input 
                prefix={<LockOutlined />}
                type='password'
                placeholder='Новый пароль'
                className={styles.modal__input}
              />
            </Form.Item>
            <Form.Item 
              className={styles.modal__formItem}
              name="confirmNewPassword"
            >
              <Input 
              prefix={<LockOutlined />}
                type='password'
                placeholder='Повторите новый пароль'
                className={styles.modal__input}
              />
            </Form.Item>
            <Form.Item style={{marginBottom: '0'}}>
              <Button
                className={styles.modal__submitButton}
                htmlType='submit'
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Поменять пароль
              </Button>
            </Form.Item>
        </Form>
    </Modal>
  )
}

export default PasswordChangeModal;
