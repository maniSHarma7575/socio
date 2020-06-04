import React, { useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import {
  BookOpen as BookOpenIcon,
  Home as HomeIcon,
  Mail as MailIcon,
  Briefcase as BriefcaseIcon
} from 'react-feather';
import {UserContext} from '../../../../App'

const useStyles = makeStyles((theme) => ({
  root: {},
  jobAvatar: {
    backgroundColor: theme.palette.secondary.main
  },
  cityAvatar: {
    backgroundColor: colors.red[600]
  }
}));

function About({
  className,
  user,
  ...rest
}) {
  const classes = useStyles();
  const {state,dispatch}=useContext(UserContext)
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader title="Profile Progress" />
        <Divider />
        <CardContent>
          <LinearProgress
            variant="determinate"
            value={state?state.profileProgress:user.profileProgress}
          />
          <Box mt={2}>
            <Typography
              variant="subtitle2"
              color="textSecondary"
            >
              {state?state.profileProgress:user.profileProgress}% Set Up Complete
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Box mt={3}>
        <Card>
          <CardHeader title="About" />
          <Divider />
          <CardContent>
            <Typography
              variant="subtitle2"
              color="textSecondary"
            >
              &quot;
              {state?state.quote:user.quote}
              &quot;
            </Typography>
            <List>
              <ListItem
                disableGutters
                divider
              >
                <ListItemAvatar>
                  <Avatar className={classes.jobAvatar}>
                    <BriefcaseIcon size="22" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={(
                    <Typography
                      variant="body2"
                      color="textPrimary"
                    >
                      {state?state.currentJob.title:user.currentJob.title}
                      {' '}
                      at
                      {' '}
                      <Link
                        variant="subtitle2"
                        color="textPrimary"
                        href="#"
                      >
                        {state?state.currentJob.company:user.currentJob.company}
                      </Link>
                    </Typography>
                  )}
                  secondary={(
                    <Typography
                      variant="caption"
                      color="textSecondary"
                    >
                      Past:
                      {state?state.previousJob.title:user.previousJob.title}
                      {' '}
                      <Link
                        variant="caption"
                        color="textSecondary"
                        href="#"
                      >
                        {state?state.previousJob.company:user.previousJob.company}
                      </Link>
                    </Typography>
                  )}
                />
              </ListItem>
              <ListItem
                disableGutters
                divider
              >
                <ListItemAvatar>
                  <Avatar className={classes.cityAvatar}>
                    <BookOpenIcon size="22" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={state?state.college:user.college}
                  primaryTypographyProps={{
                    variant: 'body2',
                    color: 'textSecondary'
                  }}
                />
              </ListItem>
              <ListItem
                disableGutters
                divider
              >
                <ListItemAvatar>
                  <Avatar className={classes.cityAvatar}>
                    <HomeIcon size="22" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={(
                    <Typography
                      variant="body2"
                      color="textPrimary"
                    >
                      Lives in
                      {' '}
                      <Link
                        variant="subtitle2"
                        color="textPrimary"
                        href="#"
                      >
                        {state?state.currentCity:user.currentCity}
                      </Link>
                    </Typography>
                  )}
                  secondary={(
                    <Typography
                      variant="caption"
                      color="textSecondary"
                    >
                      Originally from
                      {' '}
                      <Link
                        variant="caption"
                        color="textSecondary"
                        href="#"
                      >
                        {state?state.originCity:user.originCity}
                      </Link>
                    </Typography>
                  )}
                />
              </ListItem>
              <ListItem
                disableGutters
                divider
              >
                <ListItemAvatar>
                  <Avatar className={classes.cityAvatar}>
                    <MailIcon size="22" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={state?state.email:user.email}
                  primaryTypographyProps={{
                    variant: 'body2',
                    color: 'textPrimary'
                  }}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

About.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default About;