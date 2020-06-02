import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import GroupIcon from '@material-ui/icons/Group';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonIcon from '@material-ui/icons/Person';
import PublicIcon from '@material-ui/icons/Public';

import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />,
      key:1
    },
    {
      title: 'Social Platform',
      href: '/login',
      icon: <GroupIcon />,
      nested:true,
      key:2,
      nestedLink:[
        {
          title: 'Profile',
          href:'/profile',
          icon: <PersonIcon />,
          key:3
        },
        {
          title: 'Feed',
          href:'/feed',
          icon: <PublicIcon />,
          key:4
        }
      ]
    },
    {
      title: 'Products',
      href: '/products',
      icon: <ShoppingBasketIcon />,
      key:5
    },
    {
      title: 'Authentication',
      href: '/sign-in',
      icon: <LockOpenIcon />,
      key:6
    },
    {
      title: 'Typography',
      href: '/typography',
      icon: <TextFieldsIcon />,
      key:7
    },
    {
      title: 'Icons',
      href: '/icons',
      icon: <ImageIcon />,
      key:8
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />,
      key:9
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />,
      key:10
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
       
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
