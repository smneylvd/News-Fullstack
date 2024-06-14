import React from 'react';
import { Select as MuiSelect, styled, FormControl, Box, Chip } from '@mui/material';

import { SelectProps } from './Select.props';
import { Label } from '../Label/Label';
import { ReactComponent as EditIcon } from "@src/assets/icons/edit.svg";
import DeleteIcon from '@src/assets/icons/deleteIcon.png';

import { NavLink } from 'react-router-dom';


const CustomSelect = styled(MuiSelect, {
	shouldForwardProp: (prop) => prop !== 'selectSize',
})<{ selectSize?: 's' | 'm' | 'l' }>(({ selectSize, theme }) => ({
	borderRadius: '10px',
	'& .MuiSelect-select': {

		fontWeight: '400',
		color: theme.palette.text.primary,
		borderRadius: '10px',
		padding: selectSize === 's' ? '6.5px 20px' : '10px 20px',
		backgroundColor: theme.palette.grey,
	},
}));

export const Select: React.FC<SelectProps> = (props) => {
	const { children, placeholder, label, helper, fullWidth, edit, onDelete, selectSize = 's', ...otherProps } = props;
	return (
		<FormControl fullWidth={fullWidth} >
			{label && <Label label={label} helper={helper} />}
			<Box display="flex" alignItems="center" >
				{edit ?
					<Box mr="2px" bgcolor="#E8E8E9" padding="4.5px" borderRadius="10px" sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
						<NavLink to={edit}>
							<EditIcon />
						</NavLink>
					</Box>
					: null}
				<CustomSelect
					sx={{ borderTopLeftRadius: edit ? 0 : "auto", borderBottomLeftRadius: edit ? 0 : "auto" }}
					fullWidth={fullWidth}
					disableUnderline
					size='small'
					variant='filled'
					selectSize={selectSize}
					{...otherProps}>
					{children}
				</CustomSelect>
				{onDelete
					? <div ><img src={DeleteIcon} alt="dlti" style={{ cursor: "pointer", marginLeft: "5px" }} onClick={onDelete} /></div>
					: null}
			</Box>
		</FormControl>
	);
};
