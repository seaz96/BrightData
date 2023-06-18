import React from 'react'
import { Form, Select } from 'antd'
import type { SelectProps } from 'antd';

import styles from './Filter.module.scss';
import './Filter.css';

export default function Filter() {
  const stackOptions: SelectProps['options'] = [
  {
    label: 'Javascript',
    value: 'Javascript'
  }];

  const sortOptions: SelectProps['options'] = [
  {
    label: 'По популярности',
    value: 0
  }];

  return (
    <Form className={styles.filter}>
      <p className={styles.filter__name}>Новые проекты</p>
      <Form.Item
        className={styles.filter__formItem}
      >
        <Select 
          mode="multiple"
          placeholder="Все стеки"
          options={stackOptions}
          className={styles.filter__input}
        />
      </Form.Item>
      <Form.Item 
        className={styles.filter__formItem}
      >
        <Select 
          options={sortOptions}
          defaultValue={sortOptions[0]}
          className={styles.filter__input}
        />
      </Form.Item>
    </Form>
  )
}
