import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import {UserContext} from '../../App'
import axios from '../../utils/axios'
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  likedButton: {
    color: colors.red[600]
  }
}));

function Reactions({ post, className, ...rest }) {
  const {state,dispatch}=useContext(UserContext)
  const classes = useStyles();
  const [liked, setLiked] = useState(post.likes.includes(state._id));
  const [likes, setLikes] = useState(post.likes.length);

  const handleLike = (e,id) => {
    e.preventDefault()
    axios.put('/like',{
      postId:id
    },{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then((response)=>{
      setLiked(true);
      setLikes((prevLikes) => prevLikes + 1);
    },(error)=>{
      console.log(error)
    })
    
     
  };

  const handleUnlike = (e,id) => {
    e.preventDefault()
    axios.put('/unlike',{
      postId:id
    },{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    })
    .then((response)=>{
      setLiked(false);
      setLikes((prevLikes) => prevLikes - 1);
    },(error)=>{
      console.log(error)
    })
    
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      {liked ? (
        <Tooltip title="Unlike">
          <IconButton
            className={classes.likedButton}
            onClick={(e)=>handleUnlike(e,post._id)}
          >
            <FavoriteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Like">
          <IconButton onClick={(e)=>handleLike(e,post._id)}>
            <FavoriteBorderIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      <Typography
        color="textSecondary"
        variant="h6"
      >
        {likes}
      </Typography>
      <Box flexGrow={1} />
      <IconButton>
        <ShareIcon fontSize="small" />
      </IconButton>
    </div>
  );
}

Reactions.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object.isRequired
};

export default Reactions;