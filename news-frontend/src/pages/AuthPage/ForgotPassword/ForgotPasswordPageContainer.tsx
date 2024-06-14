import React from 'react';

import {ForgotPasswordPageLayout} from './ForgotPasswordPageLayout';
import {AuthBasePageLayout} from "@src/pages/AuthPage";

const ForgotPasswordPageContainer: React.FC = () => {

    return (
        <React.Fragment>
            <AuthBasePageLayout>
                <ForgotPasswordPageLayout/>
            </AuthBasePageLayout>
        </React.Fragment>
    );
};

export default ForgotPasswordPageContainer;