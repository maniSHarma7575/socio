import React,{useRef,useState,useEffect,useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {UserContext} from '../../../App'
import axios from '../../../utils/axios'
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  },
  fileInput: {
    display: 'none'
  }
}));

const ProfileDetails = props => {
  const {state,dispatch}=useContext(UserContext)
  const { user,className, ...rest } = props;
  const fileInputRefHeader = useRef(null);
  const [image,setImage]=useState('')
  const classes = useStyles();
  const handleAttach = () => {
    fileInputRefHeader.current.click();
  };

  const updateAvatar=(url)=>{
    axios.put('/updateavatar',{
        avatar:url
    },{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then((response)=>{
        const {data}=response
        localStorage.setItem("user",JSON.stringify({
          ...state,avatar:data.avatar
        }))
        dispatch({type:"UPDATEAVATAR",payload:data.avatar})
    },(error)=>{
        console.log(error)
    })
  }

  useEffect(()=>{
    if(image)
    {
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
        updateAvatar(data.url)
        })
      .catch(error=>{
        console.log(error)
      })
    }

  },[image])
  
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {user.name}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.currentCity}, {user.country}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {moment().format('hh:mm A')} ({`GMT+5:30`})
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">{user.profileProgress} %</Typography>
          <LinearProgress
            value={user.profileProgress}
            variant="determinate"
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
          onClick={handleAttach}
        >
          Upload picture
        </Button>
        <input
            className={classes.fileInput}
            ref={fileInputRefHeader}
            type="file"
            accept="image/x-png,image/gif,image/jpeg,image/jpg"
            onChange={(e)=>{setImage(e.target.files[0])}}
          />
        <Button variant="text" onClick={(e)=>updateAvatar('')}>Remove picture</Button>
      </CardActions>
    </Card>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
