import { Tooltip, Button, ButtonProps } from '@mui/material';
import React from 'react';

interface ActionButtonProps extends ButtonProps {
    icon?: React.ReactNode;
    tooltip?: string;
    loading?: boolean
}

const ActionButton: React.FC<ActionButtonProps> = (
    {
        icon,
        onClick,
        tooltip,
        variant = 'contained',
        color = 'primary',
        size = 'small',
        sx = {},
        ...props
    }) => {
    return (
        <Tooltip title={tooltip || ''}>
            <Button
                variant={variant}
                onClick={onClick}
                color={color}
                size={size}
                sx={{
                    width: 'fit-content',
                    height: 'fit-content',
                    minWidth: 'unset',
                    padding: 0.5,
                    borderRadius: 20,
                    ...sx,
                }}
                {...props}
            >
                {icon}
            </Button>
        </Tooltip>
    );
};

export default ActionButton;