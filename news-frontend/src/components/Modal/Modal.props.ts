import React from "react";

export interface ModalProps {
	open: boolean;
	handleClose: () => void;
	children?: React.ReactNode;
	maxWidth?: string,
	width?: string
	marginLeft?: string,
	marginRight?: string,
}
