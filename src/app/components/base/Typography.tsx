import { Typography as MuiTypography, TypographyProps } from '@mui/material';
import React from 'react';

interface CustomTypographyProps extends TypographyProps {
	size?: number;
	weight?: number;
	as?: React.ElementType;
}

const Typography: React.FC<CustomTypographyProps> = (
	{
		variant = 'body',
		size = 1,
		weight = 1,
		as = 'span',
		children,
		...props
	}) => {
	const getVariantStyles = () => {
		switch (variant) {
			case 'heading':
				return {
					fontWeight: 700,
					fontSize: `${size}rem`,
					'@media (max-width: 600px)': {
						fontSize: `${size * 0.875}rem`,
					},
				};
			case 'subtitle1':
				return {
					fontWeight: 500 * weight,
					color: 'white',
					fontSize: `${size}rem`,
					'@media (max-width: 1599.98px)': {
						fontSize: `${size}rem`,
					},
					'@media (max-width: 1199.98px)': {
						fontSize: `${size}rem`,
					},
					'@media (max-width: 991.98px)': {
						fontSize: `${size}rem`,
					},
					'@media (max-width: 767.98px)': {
						fontSize: `${size * 0.75}rem`,
					},
					'@media (max-width: 575.98px)': {
						fontSize: `${size * 0.875}rem`,
					},
				};
			case 'caption':
				return {
					fontWeight: 500 * weight,
					fontSize: `${size}rem`,
					color: 'black',
					'@media (max-width: 1599.98px)': {
						fontSize: `${size}rem`,
					},
					'@media (max-width: 1199.98px)': {
						fontSize: `${size}rem`,
					},
					'@media (max-width: 991.98px)': {
						fontSize: `${size}rem`,
					},
					'@media (max-width: 767.98px)': {
						fontSize: `${size * 0.75}rem`,
					},
					'@media (max-width: 575.98px)': {
						fontSize: `${size * 0.875}rem`,
					},
				};
			default:
				return {
					fontWeight: 500 * weight,
					fontSize: `${size}rem`,
					'@media (max-width: 1599.98px)': {
						fontSize: `${size * 1.25}rem`,
					},
					'@media (max-width: 1199.98px)': {
						fontSize: `${size * 1.125}rem`,
					},
					'@media (max-width: 991.98px)': {
						fontSize: `${size}rem`,
					},
					'@media (max-width: 767.98px)': {
						fontSize: `${size * 0.875}rem`,
					},
					'@media (max-width: 575.98px)': {
						fontSize: `${size * 0.875}rem`,
					},
				};
		}
	};

	return (
		<MuiTypography
			component={as}
			sx={getVariantStyles()}
			{...props}
		>
			{children}
		</MuiTypography>
	);
};

export default Typography;