import React from 'react';
import { Box, FormLabel } from '@mui/material';
import { LabelProps } from './Label.props';

export const Label: React.FC<LabelProps> = (props) => {
	const { label, helper } = props;
	return (
		<Box display='flex' alignItems='center' justifyContent='space-between' mb='3px'>
			<FormLabel
				sx={{ fontSize: '0.875em', color: 'text.secondary', cursor: 'pointer' }}>
				{label}
			</FormLabel>
			{helper && (
				<Box
					fontSize='0.875em'
					color='text.secondary'
					sx={{ cursor: 'pointer' }}>
					{helper}
				</Box>
			)}
		</Box>
	);
};