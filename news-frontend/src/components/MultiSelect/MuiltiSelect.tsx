import { Box, Chip, MenuItem, SelectChangeEvent } from "@mui/material";
import React from "react";
import { Select } from "../Select/Select";
import { MuiltiSelectProps } from "./MuiltiSelect.props";

export const MultiSelect: React.FC<MuiltiSelectProps> = (props) => {
  const { innerLabel, handleChange, defaultValues, additionalDelete, ...otherProps } = props;

  const [state, setState] = React.useState<Array<any>>(() => defaultValues || []);

  const onChange = (e: SelectChangeEvent<any>): void => {
    const item = e.target.value;

    const newVal = (state.indexOf(item) === -1) ? [...state, item] : state;
    setState(newVal);
    handleChange(newVal);

  };
  const handleDelete = (item: any): void => {
    const newVal = state.filter(el => el !== item);
    setState(newVal);
    handleChange(newVal);
    additionalDelete ? additionalDelete() : null;
  };
  const onBlur = (e: any) => {


  };
  return (
    <React.Fragment>
      <Select onChange={onChange} value={innerLabel} {...otherProps} >
        <MenuItem disabled value={innerLabel}>{innerLabel}</MenuItem>
        {props.children}
      </Select>
      <Box mt=".5rem" display="flex" gap=".5rem" flexWrap="wrap">
        {state.length
          ? state.map(item => (
            <Chip label={item} key={item} onDelete={() => handleDelete(item)} />
          ))
          : null}
      </Box>
    </React.Fragment>
  );
};