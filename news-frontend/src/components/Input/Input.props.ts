import { OutlinedInputProps } from '@mui/material';
import React from 'react';

export interface InputProps extends Omit<OutlinedInputProps, 'label'> {
	inputSize?: 's' | 'm' | 'l';
	label?: string;
	helper?: React.ReactNode | string;
	activeBorderColor?: 'primary' | 'success' | 'warning'
};