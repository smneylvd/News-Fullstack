import { SelectProps } from "../Select/Select.props";


export interface MuiltiSelectProps extends SelectProps {
  innerLabel: string,
  handleChange: (val: any) => void,
  defaultValues?: Array<any>,
  additionalDelete?: any
}