import { SelectProps as MuiSelectProps } from '@mui/material';

export interface Select2Props extends Omit<MuiSelectProps, 'label'> {
	selectSize?: 's' | 'm' | 'l';
	helper?: React.ReactNode | string;
	label?: string;
	fullWidth?: boolean;
}