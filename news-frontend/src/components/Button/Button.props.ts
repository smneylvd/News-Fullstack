import { ButtonProps as CustomButtonProps } from '@mui/material';

export interface ButtonProps extends CustomButtonProps {
	buttonSize?: 's' | 'm' | 'l';
}