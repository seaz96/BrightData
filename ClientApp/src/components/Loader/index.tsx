import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import styles from './Loader.module.scss';

const Loader = () => {
    return (
        <div className={styles.loader}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 56 }} spin />} />
        </div>
    );
};

export default Loader;