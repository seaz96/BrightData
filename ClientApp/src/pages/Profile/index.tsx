import React, {useEffect, useState} from 'react';

import {default as BasePage} from './Profile';
import axios from 'axios';
import { userData } from 'Types';
import { userStore } from 'store';
import { Loader } from 'components';
import { observer } from 'mobx-react';


const Profile = () => {

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get<userData>("http://localhost:5000/api/users/id/" + userStore.currentUser.id)
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