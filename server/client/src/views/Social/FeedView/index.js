import React, {
  useState,
  useEffect,
  useCallback,
  useContext
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from '../../../utils/axios';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import Page from '../../../components/Page';
import PostAdd from '../../../components/PostAdd';
import PostCard from '../../../components/PostCard';
import Header from './Header';
import {PostContext} from '../../../App'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function SocialFeedView() {
  const {postState,postDispatch}=useContext(PostContext)
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();

  const getPosts = useCallback(() => {
    axios
      .get('/allpost',{
        headers:{
          "Authorization":"Bearer "+localStorage.getItem('jwt')
        }
      })
      .then((response) => {
        if (isMountedRef.current) {
          postDispatch({type:'POST',payload:response.data.result})
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (!postState) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Social Feed"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <PostAdd />
        </Box>
        {postState.map((post) => (
          <Box
            mt={3}
            key={post._id}
          >
            <PostCard post={post} />
          </Box>
        ))}
      </Container>
    </Page>
  );
}

export default SocialFeedView;