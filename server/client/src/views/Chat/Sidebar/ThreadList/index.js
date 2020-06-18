import React, {
  useState,
  useEffect
} from 'react';
import {
  Link as RouterLink,
  useLocation
} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { getThreads } from '../../../../actions/chatActions';
import {
  Avatar,
  Box,
  ClickAwayListener,
  Input,
  SvgIcon,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import ThreadItem from './ThreadItem';

function filterContacts(contacts, searchText) {
  if (!searchText) {
    return contacts;
  }

  return contacts.filter(
    (contact) => contact.name.toLowerCase().includes(searchText.toLowerCase())
  );
}

const useStyles = makeStyles((theme) => ({
  root: {},
  searchContainer: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    height: 44,
    borderRadius: 22,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: theme.palette.background.dark
  },
  searchInput: {
    flexGrow: 1,
    marginLeft: theme.spacing(1)
  },
  contactAvatar: {
    height: 32,
    width: 32
  },
  threadList: {},
  hideThreadList: {
    display: 'none'
  }
}));

function ThreadList({ className, ...rest }) {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const {contacts,threads } = useSelector((state) => state.chat);
  const [searchText, setSearchText] = useState('');
  const [displaySearchResults, setDisplaySearchResults] = useState(false);

  const handleSearchFocus = (event) => {
    event.persist();
    setDisplaySearchResults(true);
  };

  const handleSearchChange = (event) => {
    event.persist();
    setSearchText(event.target.value);
  };

  const handleSearchClickAway = () => {
    if (displaySearchResults) {
      setSearchText('');
      setDisplaySearchResults(false);
    }
  };

  useEffect(() => {
    dispatch(getThreads());
  }, [dispatch]);

  useEffect(() => {
    if (displaySearchResults) {
      setDisplaySearchResults(false);
    }
    // eslint-disable-next-line
  }, [location.pathname]);
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <ClickAwayListener onClickAway={handleSearchClickAway}>
        <div className={classes.searchContainer}>
          <div className={classes.search}>
            <SvgIcon
              fontSize="small"
              color="action"
            >
              <SearchIcon />
            </SvgIcon>
            <Input
              className={classes.searchInput}
              disableUnderline
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              placeholder="Search contacts"
              value={searchText}
            />
          </div>
          {displaySearchResults && (
          <Box mt={2}>
            <Typography
              variant="h6"
              color="textSecondary"
            >
              Contacts
            </Typography>
            <List>
              {filterContacts(contacts.chatContacts, searchText).map((contactItem) => {
                const contact = contactItem
                return (
                  <ListItem
                    button
                    component={RouterLink}
                    key={contact._id}
                    to={`/chat/${contact._id}`}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={contact.avatar}
                        className={classes.contactAvatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={contact.name}
                      primaryTypographyProps={{
                        noWrap: true,
                        variant: 'h6',
                        color: 'textPrimary'
                      }}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Box>
          )}
        </div>
      </ClickAwayListener>
      <List className={clsx(classes.threadList,
        { [classes.hideThreadList]: displaySearchResults })}
      >
        {threads.chatThreads.map((threadKey) => (
          <ThreadItem
            key={threadKey._id}
            thread={threadKey}
          />
        ))
        }
      </List>
    </div>
  );
}

ThreadList.propTypes = {
  className: PropTypes.string
};

export default ThreadList;