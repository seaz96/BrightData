import React from 'react'

import {MainHeader as BaseHeader} from 'components';
import { User } from 'Types';

interface MainHeaderProps {
    user: User,
    openAddProjectModal: Function,
    openSignUpModal: Function
}


export default function MainHeader({
    openSignUpModal,
    openAddProjectModal,
    user
}: MainHeaderProps) {


    return (
        <BaseHeader 
            openSignUpModal={openSignUpModal}
            openAddProjectModal={openAddProjectModal}
            user={user}
        />
    )
}
