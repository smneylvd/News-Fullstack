import { createTheme, Theme } from '@mui/material';
import React from 'react';




export const theme: Theme = createTheme({
	palette: {
		primary: {
			main: '#0A66C2',
		},
		secondary: {
			main: '#34A853',
			contrastText: '#FFFFFF',
		},
		error: {
			main: "#AB353F",
			contrastText: "#AB353F"
		},
		success: {
			main: '#025F3E',
		},
		neutral: {
			main: '#E8E8E9',
		},
		onyx: {
			main: '#040F0F',
			contrastText: '#040F0F',
		},
		text: {
			primary: '#040F0F',
			secondary: '#656665',
		},
		common: {
			white: '#FFFFFF',
			black: '#000000',
		},
		pink: {
			main: "#F6EFEF",
			contrastText: "#AB353F"
		},
		accepted: {
			main: "#F48503",
			contrastText: "#AB353F",
		},
		new: {
			main: "#1D8C48",
			contrastText: "#AB353F",
		},
		ready: {
			main: "#1D8C48",
			contrastText: "#AB353F",
		}


	},
	typography: {
		fontFamily: "Inter",

		fontSize: 16,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,

		button: {
			textTransform: 'none',
		},

		h1: {
			fontSize: '0.75em' // 12px
		},
		h2: {
			fontSize: '0.875em' // 14px
		},
		h3: {
			fontSize: '1em' // 16px
		},
		h4: {
			fontSize: '1.125em' // 18px
		},
		h5: {
			fontSize: '1.25em' // 20px
		},
		h6: {
			fontSize: '1.375em' // 22px
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		}
	}
});

declare module '@mui/material/styles' {
	interface Palette {
		neutral: Palette['primary'];
		onyx: Palette['primary'];
		pink?: PaletteOptions['primary'];
		accepted?: Palette['primary'];
		new?: Palette['primary'];
		ready?: Palette['primary'];
	}
	interface PaletteOptions {
		neutral?: PaletteOptions['primary'];
		onyx?: PaletteOptions['primary'];
		pink?: PaletteOptions['primary'];
		accepted?: PaletteOptions['primary'];
		new?: PaletteOptions['primary'];
		ready?: PaletteOptions['primary'];
	}
}

declare module '@mui/material/Button' {
	interface ButtonPropsColorOverrides {
		neutral: true;
		onyx: true;
		pink: true;
	}
}

declare module '@mui/material/Chip' {
	interface ChipPropsColorOverrides {
		accepted: true;
		new: true;
		ready: true;
	}
}