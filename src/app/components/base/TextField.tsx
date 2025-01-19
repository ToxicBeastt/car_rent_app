import { TextField as MUITextField } from '@mui/material'
import React, { ChangeEvent, ChangeEventHandler } from 'react'
import Typography from './Typography'

interface TextFieldProps {
	label?: string
	error?: boolean
	errorMsg?: string
	variant?: 'filled' | 'outlined' | 'standard'
	required?: boolean
	name?: string
	placeholder?: string
	value?: string
	onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
	type?: 'text' | 'password' | 'email' | 'number' | 'currency' | 'date'
	id?: string
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

const TextField = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps>(
	(
		{
			label,
			error,
			errorMsg,
			variant = 'outlined',
			required = false,
			value = '',
			onChange = () => {},
			type = 'text',
			inputProps
		},
		ref
	) => {
		const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const inputValue = event.target.value

			if (type === 'currency') {
				const numericValue = inputValue.replace(/[^\d]/g, '')
				onChange({
					...event,
					target: {
						...event.target,
						value: numericValue
					}
				})
			} else if (type === 'number') {
				const numericValue = Number(inputValue)
				const min = inputProps?.min ? Number(inputProps.min) : undefined
				const max = inputProps?.max ? Number(inputProps.max) : undefined

				// Enforce min and max values
				if (min !== undefined && numericValue < min) {
					onChange({
						...event,
						target: {
							...event.target,
							value: String(min)
						}
					})
				} else if (max !== undefined && numericValue > max) {
					onChange({
						...event,
						target: {
							...event.target,
							value: String(max)
						}
					})
				} else {
					onChange(event)
				}
			} else {
				onChange(event)
			}
		}

		return (
			<div>
				<div>
					<Typography size={0.875}>
						{label}
						{required && <span style={{ color: 'red' }}>*</span>}
					</Typography>
				</div>
				<MUITextField
					value={value}
					onChange={handleChange}
					error={!!error}
					variant={variant}
					placeholder={label}
					type={type === 'currency' ? 'text' : type}
					inputRef={ref}
					sx={{
						width: '100%'
					}}
				/>
				{error && errorMsg && (
					<div style={{ color: 'red', fontSize: 12, marginLeft: 8 }}>{errorMsg}</div>
				)}
			</div>
		)
	}
)

TextField.displayName = 'TextField'

export default TextField