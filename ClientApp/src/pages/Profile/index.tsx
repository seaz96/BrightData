import React, {useEffect, useState} from 'react';

import {default as BasePage} from './Profile';
import axios from 'axios';
import { userData } from 'Types';
import { userStore } from 'store';
import { Loader } from 'components';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';


const Profile = () => {
  const userId = useParams().id

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get<userData>("http://localhost:5000/api/users/id/" + userId)
      .catch(error => console.log(error))
      if(data) userStore.setUserData(data.data);
    };
    getData();
  }, []);
  if(userStore.userData===null) return <Loader />

  return (
    <BasePage userData={userStore.userData}/>
  )
}

export default observer(Profile);