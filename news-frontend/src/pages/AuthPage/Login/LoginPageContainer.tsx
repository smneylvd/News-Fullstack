import React from 'react';

import { LoginPageLayout } from './LoginPageLayout';
import {AuthBasePageLayout} from "@src/pages/AuthPage";

const LoginPageContainer: React.FC = () => {

	return (
		<React.Fragment>
			<AuthBasePageLayout>
				<LoginPageLayout/>
			</AuthBasePageLayout>
		</React.Fragment>
	);
};

export default LoginPageContainer;