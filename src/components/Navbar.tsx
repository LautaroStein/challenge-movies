'use client'

import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setThemeMode } from '@/lib/features/theme/themeSlice';
import { Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';

export default function Navbar() {
  const mode = useAppSelector(selector => selector.theme.mode)
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleTheme = () => {
    dispatch(setThemeMode(mode === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleClick}
            aria-controls={open ? 'menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Movies
          </Typography>
          <SearchBar />
          <ThemeToggle toggleTheme={toggleTheme} />
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Link href='/'>
            Now
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href='/popular'>
            Popular
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href='/top-rated'>
            Top rated
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href='/upcoming'>
            Upcoming
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};
