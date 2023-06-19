import React from 'react'
import { Form, Select } from 'antd'
import type { SelectProps } from 'antd';

import styles from './Filter.module.scss';
import './Filter.css';

interface FilterProps {
  setTechnologiesFilter: Function
}

const Filter:React.FC<FilterProps> = ({setTechnologiesFilter}) => {
  const stackOptions: SelectProps['options'] = [
  {
    label: 'Javascript',
    value: 'Javascript'
  },
  {
    label: 'Rust',
    value: 'Rust'
  },
  {
    label: 'C++',
    value: 'C++'
  },
  {
    label: 'C',
    value: 'C'
  },
  {
    label: 'C#',
    value: 'C#'
  },
  {
    label: 'Python',
    value: 'Python'
  },
  {
    label: 'Java',
    value: 'Java'
  },
  {
    label: 'Go',
    value: 'Go'
  },
  {
    label: 'Kotlin',
    value: 'Kotlin'
  },
  {
    label: 'Typesript',
    value: 'Typesript'
  },
  {
    label: 'Cobol',
    value: 'Cobol'
  },
  {
    label: 'Haskell',
    value: 'Haskell'
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
          onChange={(values: any) => setTechnologiesFilter(values)}
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

export default Filter;