import React, { useState, useRef,useContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {UserContext} from '../App'
import {
  Box,
  Card,
  CardContent,
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
import axios from '../utils/axios'
import {PostContext} from '../.'
const useStyles = makeStyles(() => ({
  root: {},
  divider: {
    width: 1,
    height: 24
  },
  fileInput: {
    display: 'none'
  }
}));

function PostAdd({ className, ...rest }) {
  const {state,dispatch}=useContext(UserContext)
  const {postState,postDispatch}=useContext(PostContext)
  const classes = useStyles();
  const fileInputRef = useRef(null);
  const [value, setValue] = useState('');
  const [image,setImage]=useState('')
  const handleChange = (event) => {
    event.persist();
    setValue(event.target.value);
  };

  const handleAttach = () => {
    fileInputRef.current.click();
  };
  const uploadImage=()=>{
    const data=new FormData()
    data.append("file",image)
    data.append("upload_preset","socio-clone")
    data.append("cloud_name","socio")
    fetch("https://api.cloudinary.com/v1_1/socio/image/upload",{
      method:"post",
      body:data
    })
    .then(res=>res.json())
    .then(data=>{
      uploadFields(data.url)
    })
    .catch(error=>{
      console.log(error)
    })
  }
  const uploadFields=(url)=>{
    if(value || url)
    {
      axios.post('/createPost',{
        message:value,
        media:url
      },{
        headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt") 
        }
      })
      .then((response)=>{
        console.log(response.data.post)
        postDispatch({type:'ADDPOST',payload:response.data.post})
      },(error)=>{
        console.log(error)
      })
    }
  }
  const addPost=(event)=>{
    event.persist();
    image?uploadImage():uploadFields('')
    setValue('')
    setImage('')
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
        >
          <Paper
            component={Box}
            flexGrow={1}
            py={0.5}
            px={2}
            variant="outlined"
          >
            <Input
              disableUnderline
              fullWidth
              onChange={handleChange}
              placeholder={`What's on your mind, ${state.name}`}
              value={value}
            />
          </Paper>
          <Tooltip title="Send">
            <IconButton onClick={addPost} color={value.length > 0 ? 'primary' : 'default'}>
              <SendIcon />
            </IconButton>
          </Tooltip>
          <Divider className={classes.divider} />
          <Tooltip title="Attach image">
            <IconButton
              edge="end"
              onClick={handleAttach}
            >
              <AddPhotoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Attach file">
            <IconButton
              edge="end"
              onClick={handleAttach}
            >
              <AttachFileIcon />
            </IconButton>
          </Tooltip>
          <input
            className={classes.fileInput}
            ref={fileInputRef}
            type="file"
            onChange={(e)=>setImage(e.target.files[0])}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

PostAdd.propTypes = {
  className: PropTypes.string
};

export default PostAdd;