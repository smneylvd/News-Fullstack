import React from 'react';

import {RegisterPageLayout} from './RegisterPageLayout';
import {AuthBasePageLayout} from "@src/pages/AuthPage";

const RegisterPageContainer: React.FC = () => {

    return (
        <React.Fragment>
            <AuthBasePageLayout>
                <RegisterPageLayout/>
            </AuthBasePageLayout>
        </React.Fragment>
    );
};

export default RegisterPageContainer;