import React, {ChangeEvent, useState} from 'react';

import {Select} from 'src/components/Select/Select';
import {MenuItem, Chip, SelectChangeEvent} from "@mui/material";
import {Select2Props} from "@src/components/Select2/Select2.props";


export const Select2: React.FC<Select2Props> = (props) => {
  const {children, placeholder, label, helper, fullWidth, selectSize = 's', ...otherProps} = props;
  const [selectedArr, setSelectedArr] = useState(Array<any>());
  const handleChange = (e: SelectChangeEvent<any>, child: React.ReactNode): void => {
    if (selectedArr.includes(e.target.value)) {
      setSelectedArr(selectedArr.filter(el => el !== e.target.value));
    } else {
      setSelectedArr([...selectedArr, e.target.value]);
    }
  };
  const handleDelete = (item: any) => {
    setSelectedArr(selectedArr.filter(el => el !== item));
  };
  return (
    <div className="App">
      <Select
        onChange={handleChange}
        fullWidth={fullWidth}
        disableUnderline
        size='small'
        variant='filled'
        selectSize={selectSize}
      >
        {children}
      </Select>
      <div style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}}>
        {selectedArr.map((el) => {
          return (
            <Chip key={el} size="small" style={{marginLeft: ".25em", marginRight: ".25em", marginTop: ".5em"}} variant="outlined" onDelete={() => handleDelete(el)} label={el}/>
          );
        })}
      </div>
    </div>
  );
};
