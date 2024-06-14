import React from 'react';
import { Button as MuiButton, styled } from '@mui/material';

import { ButtonProps } from './Button.props';


const CustomButton = styled(MuiButton, {
	shouldForwardProp: (prop) => prop !== 'buttonSize',
})<{ buttonSize?: 's' | 'm' | 'l' }>(({ buttonSize }) => ({
	padding: buttonSize === 's' ? '0px 20px' : buttonSize === 'm' ? '0px 25px' : '0',
	height: buttonSize === 's' ? '40px' : buttonSize === 'm' ? '50px' : '0px',
	borderRadius: '10px',
	fontWeight: 400,
	lineHeight: 0,
	whiteSpace: 'nowrap',
	boxShadow: 'none',
}));

export const Button: React.FC<ButtonProps> = (props) => {
	const { children, buttonSize = 's', ...otherProps } = props;
	return (
		<CustomButton buttonSize={buttonSize} {...otherProps}>
			{children}
		</CustomButton>
	);
};
