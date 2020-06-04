import React, {
  useState,
  useEffect,
  useCallback,
  useContext
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Grid,
  makeStyles
} from '@material-ui/core';
import axios from '../../../../../src/utils/axios';
import useIsMountedRef from '../../../../../src/hooks/useIsMountedRef';
import PostAdd from '../../../../../src/components/PostAdd';
import PostCard from '../../../../../src/components/PostCard';
import About from './About';
import {PostContext} from '../../../../App'
const useStyles = makeStyles(() => ({
  root: {}
}));

function Timeline({
  className,
  user,
  ...rest
}) {
  const {postState,postDispatch}=useContext(PostContext)
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();

  const getPosts = useCallback(() => {
    axios
      .get(`/userpost/${user._id}`,{
        headers:{
          "Authorization":"Bearer "+localStorage.getItem('jwt')
        }
      })
      .then((response) => {
        if (isMountedRef.current) {
         postDispatch({type:'POST',payload:response.data})
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
        >
          <About user={user} />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={8}
        >
          <PostAdd />
          {postState && postState.map((post) => (
            <Box
              mt={3}
              key={post.id}
            >
              <PostCard post={post} />
            </Box>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

Timeline.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default Timeline;