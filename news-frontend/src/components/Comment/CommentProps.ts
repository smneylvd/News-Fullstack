import { ButtonProps as CustomButtonProps } from '@mui/material';

export interface CommentProps extends CustomButtonProps {
	comment: any;
	seed: number;
	repliedTo?: any;
	news_id: number,
}