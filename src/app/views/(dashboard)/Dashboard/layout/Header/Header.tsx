import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Tooltip, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';
import { Profile } from '@/app/types';


const Header = (props: { isOpen:boolean; toggleSidebar: () => void; profile: Profile}) => {
  const { toggleSidebar, isOpen, profile } = props;
  const { username } = profile || {};

  const formattedString = `${username ? username : 'Guest'}`;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsConfirmOpen(false);
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu' onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' flexGrow={1}>
          Car Rent App
        </Typography>
        <Tooltip title={username}>
          <Typography variant='body1'>{formattedString}</Typography>
         </Tooltip>
        <Tooltip title='Account Settings'>
          <IconButton onClick={handleMenuOpen} color='inherit'>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon /> Log Out
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
