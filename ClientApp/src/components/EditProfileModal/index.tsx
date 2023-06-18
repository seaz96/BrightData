import React from 'react'
import { Button, Form, Input, Modal } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, CameraFilled  } from '@ant-design/icons';

import styles from "./EditProfileModal.module.scss";
import TelegramIcon from 'assets/Telegram.svg';
import VkIcon from 'assets/Vk.svg';
import TextArea from 'antd/es/input/TextArea';
import { userData } from 'Types';

interface EditProfileModalProps {
    isOpen: boolean,
    setIsOpen: Function,
    submitFunction: Function,
    setPasswordModalOpen: Function,
    userData: userData
}

const EditProfileModel: React.FC<EditProfileModalProps> = ({isOpen, userData, setIsOpen, submitFunction, setPasswordModalOpen}) => {
  return (
    <Modal 
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        title='Ваш профиль'
        className={styles.modal}
    >
        <Form 
          className={styles.modal__form} 
          onFinish={(values: any) => submitFunction(values)}
          initialValues={{
            "name": userData.name,
            "email": userData.email,
            "description": userData.description,
            "vkLink": userData.vkLink,
            "telegramLink": userData.telegramLink,
            "photo": userData.photo
          }}
        >
            <b className={styles.modal__profileHeader}>Профиль</b>
            <Form.Item 
              className={styles.modal__formItem} 
              name="name"
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
              name="email"
            >
              <Input 
                  prefix={<MailOutlined />}
                  type='email'
                  placeholder='Email'
                  className={styles.modal__input}
              />
            </Form.Item>
            <Button className={styles.modal__resetPasswordButton} 
              onClick={() => {
                setPasswordModalOpen(true)
                setIsOpen(false)
              }}>
                <LockOutlined /> Изменить пароль?
            </Button>    
            <b className={styles.modal__ArticleInfoHeader}>Дополнительная информация</b>
            <Form.Item
              style={{marginBottom: '20px'}}
              className={styles.modal__formItem} 
              name="description"
            >
              <TextArea rows={4}
                  style={{resize: "none"}}
                  placeholder='Дополнительная информация'
                  className={styles.modal__input}
              />
            </Form.Item>
            <Form.Item
              style={{marginBottom: '20px'}}
              className={styles.modal__formItem} 
              name="telegramLink"
            >
              <Input 
                  prefix={<img src={TelegramIcon} />}
                  placeholder='Ссылка на телеграм'
                  className={styles.modal__input}
              />
            </Form.Item>
            <Form.Item
              style={{marginBottom: '20px'}}
              className={styles.modal__formItem} 
              name="vkLink"
            >
                <Input 
                    prefix={<img src={VkIcon} />}

                    placeholder='Ссылка на Vk'
                    className={styles.modal__input}
                />
            </Form.Item>
            <Form.Item
              style={{marginBottom: '20px'}}
              className={styles.modal__formItem} 
              name="photo"
            >
                <Input 
                    prefix={<CameraFilled style={{opacity: '0.7'}}/>}

                    placeholder='Ссылка на фото'
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
                Сохранить
              </Button>
            </Form.Item>
        </Form>
    </Modal>
  )
}

export default EditProfileModel;