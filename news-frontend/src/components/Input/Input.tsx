import React from 'react';
import {Label} from '@src/components';
import {FormControl, IconButton, InputAdornment, OutlinedInput, styled} from '@mui/material';

import {InputProps} from './Input.props';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CustomOutlineInput = styled(OutlinedInput, {
        shouldForwardProp: (prop) => prop !== 'inputSize',
    })
    < {inputSize: 's' | 'm' | 'l'} > (({inputSize, theme}) => ({
        borderRadius: '10px',
        backgroundColor: '#DADADA',
        '& .MuiOutlinedInput-input': {
            fontSize: theme.typography.fontSize,
            padding: inputSize === 's' ? '8.5px 20px' : inputSize === 'm' ? '13.5px 20px' : '8px 0',

        },

    }));

export const Input: React.FC<InputProps> = (props) => {
    const {fullWidth, inputSize = 's', label, activeBorderColor = 'primary', helper, ...otherProps} = props;

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <FormControl fullWidth={fullWidth} sx={{width: "100%"}}>
            {label && <Label label={label} helper={helper}/>}
            <CustomOutlineInput
                fullWidth={fullWidth}
                inputSize={inputSize}
                {...otherProps}
                type={otherProps.type == "password" ? (showPassword ? 'text' : 'password') : otherProps.type}
                endAdornment={otherProps.type == "password" ?
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment> : otherProps.endAdornment
                }
                />
        </FormControl>
    );
};