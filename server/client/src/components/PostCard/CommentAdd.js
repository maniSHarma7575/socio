import React, { useRef, useState,useContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Input,
  Paper,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import {UserContext} from '../../App'
import axios from '../../../src/utils/axios'
import {PostContext} from '../../App'
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  divider: {
    width: 1,
    height: 24
  },
  fileInput: {
    display: 'none'
  }
}));

function CommentAdd({ post,className, ...rest }) {
  const {state,dispatch}=useContext(UserContext)
  const {postState,postDispatch}=useContext(PostContext)
  const classes = useStyles();
  const user=state
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    event.persist();
    setValue(event.target.value);
  };
  const handleComment=(event)=>{
    event.persist()
    console.log(value)
    axios.put('/comment',{
      message:value,
      postedBy:post._id
    },{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then((response)=>{
      console.log(response.data)
      postDispatch({type:'UPDATE',payload:response.data})
      setValue('')
    },(error)=>{
      console.log(error)
    })
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Avatar
        alt="Person"
        src={user.avatar}
      />
      <Paper
        variant="outlined"
        flexGrow={1}
        component={Box}
        ml={2}
        py={0.5}
        px={2}
      >
        <Input
          disableUnderline
          fullWidth
          onChange={handleChange}
          value={value}
          placeholder="Leave a message"
        />
      </Paper>
      <Tooltip title="Send">
        <IconButton onClick={handleComment} color={value.length > 0 ? 'primary' : 'default'}>
          <SendIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}

CommentAdd.propTypes = {
  className: PropTypes.string
};

export default CommentAdd;
