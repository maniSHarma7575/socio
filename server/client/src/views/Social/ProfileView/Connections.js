import React, {
  useState,
  useEffect,
  useCallback,
  useContext
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import _ from 'lodash';
import { useSnackbar } from 'notistack';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Input,
  Link,
  Paper,
  Typography,
  makeStyles,
  SvgIcon
} from '@material-ui/core';
import {
  Search as SearchIcon,
  MoreVertical as MoreIcon
} from 'react-feather';
import axios from '../../../../src/utils/axios';
import useIsMountedRef from '../../../../src/hooks/useIsMountedRef';
import {UserContext} from '../../../App'
const connectStatusMap = {
  true:"UnFollow",
  false:"Follow"
};

const useStyles = makeStyles((theme) => ({
  root: {},
  searchInput: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    height: 60,
    width: 60
  }
}));

function Connections({ user,className, ...rest }) {
  const {state,dispatch}=useContext(UserContext)
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [connections, setConnections] = useState(null);
  const [search, setSearch] = useState('');

  const unfollowUser=(id)=>{
    axios.put('/unfollow',{
      unfollowId:id
    },{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      }
    })
    .then(response=>{
      const {data}=response
      dispatch({type:"UPDATE",payload:{followers:data.followers,following:data.following}})
      localStorage.setItem("user",JSON.stringify(data))
      enqueueSnackbar('Unfollowed user', {
        variant: 'warning'
      });
    })
  }
  const followUser=(id)=>{
    axios.put('/follow',{
      followId:id
    },{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      }
    })
    .then((response)=>{
      const {data}=response
      dispatch({type:"UPDATE",payload:{followers:data.followers,following:data.following}})
      localStorage.setItem("user",JSON.stringify(data))
      enqueueSnackbar('Followed User Successfully', {
        variant: 'success'
      });

    },(error)=>{
      console.log(error)
    })

  }
  const handleConnectToggle = (id) => {
    const status=state?state.following.includes(id):true
    status?unfollowUser(id):followUser(id)
  };
  const commonConnection=(followers)=>{
    let intersection = state.followers.filter(x => followers.includes(x));
    return intersection.length
  }
  const getConnections = useCallback(() => {
    axios
      .get(`/connections/${user._id}`,{
        headers:{
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
      })
      .then((response) => {
        if (isMountedRef.current) {
          console.log(response.data)
          setConnections(response.data)
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getConnections();
  }, [getConnections]);

  if (!connections) {
    return null;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Connections" />
      <Divider />
      <Box
        py={2}
        px={3}
        display="flex"
        alignItems="center"
      >
        <SvgIcon
          fontSize="small"
          color="action"
        >
          <SearchIcon />
        </SvgIcon>
        <Input
          className={classes.searchInput}
          disableUnderline
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search connections"
        />
      </Box>
      <Divider />
      <Box p={3}>
        <Grid
          container
          spacing={3}
        >
          {connections
            .filter((connection) => connection.name.toLowerCase().includes(search))
            .map((connection) => (
              <Grid
                item
                key={connection._id}
                xs={12}
                md={6}
              >
                <Paper variant="outlined">
                  <Box
                    p={2}
                    display="flex"
                    alignItems="center"
                  >
                    <Avatar
                      alt="Profile image"
                      className={classes.avatar}
                      component={RouterLink}
                      src={connection.avatar}
                      to="#"
                    />
                    <Box
                      flexGrow={1}
                      mx={2}
                    >
                      <Link
                        variant="h5"
                        color="textPrimary"
                        component={RouterLink}
                        to={`/profile/${connection._id}`}
                      >
                        {connection.name}
                      </Link>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        gutterBottom
                      >
                        {commonConnection(connection.followers)}
                        {' '}
                        connections in common
                      </Typography>
                      {(
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleConnectToggle(connection._id)}
                        >
                          {connectStatusMap[state?state.following.includes(connection._id):true]}
                        </Button>
                      )}
                    </Box>
                    <IconButton>
                      <SvgIcon fontSize="small">
                        <MoreIcon />
                      </SvgIcon>
                    </IconButton>
                  </Box>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Card>
  );
}

Connections.propTypes = {
  className: PropTypes.string
};

export default Connections;