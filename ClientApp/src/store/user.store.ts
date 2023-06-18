import {makeAutoObservable} from 'mobx';

import { User, userData } from 'Types';

class UserStore {
    currentUser: User = null;
    userData: userData = null;

    constructor() {
        makeAutoObservable(this);
    }

    setCurrentUser(user: User) {
        this.currentUser = user;
    }

    setUserData(userData: userData) {
        this.userData = userData
    }
}

const userStore = new UserStore();

export default userStore;