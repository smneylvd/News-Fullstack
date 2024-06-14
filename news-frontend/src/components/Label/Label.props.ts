export interface LabelProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	label: string;
	helper?: React.ReactNode | string;
}