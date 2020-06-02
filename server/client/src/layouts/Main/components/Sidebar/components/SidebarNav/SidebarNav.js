/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  expand:{
    marginLeft: theme.spacing(2)
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { pages, className, ...rest } = props;

  const classes = useStyles();
 
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      {pages.map(page => (
        page.nested?
        <div key={page.key}>
        <ListItem 
        className={classes.item}
        disableGutters
        key={page.key}
        button onClick={handleClick}>
            <Button
            className={classes.button}
            component={CustomRouterLink}
            to="#"
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}  
            {open ? <ExpandLess className={classes.expand}/> : <ExpandMore className={classes.expand}/>}
          </Button>
        </ListItem>
        <Collapse  in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {
              page.nestedLink.map(item=>(
              <ListItem   key={item.key} button className={classes.nested}>
              <Button
                activeClassName={classes.active}
                className={classes.button}
                component={CustomRouterLink}
                to={item.href}
              >
                  <div className={classes.icon}>{item.icon}</div>
                  {item.title}
              </Button>
              </ListItem>
              ))
            }
            </List>
        </Collapse>
        </div>
        :
        <ListItem
          className={classes.item}
          disableGutters
          key={page.key}
        >
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            to={page.href}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
