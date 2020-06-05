import React, { useState ,useContext,useRef, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from 'axios'
import {
  Avatar,
  Box,
  Button,
  Container,
  Hidden,
  IconButton,
  Tooltip,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import MoreIcon from '@material-ui/icons/MoreVert';
import {UserContext} from '../../../App'
const useStyles = makeStyles((theme) => ({
  root: {},
  cover: {
    position: 'relative',
    height: 460,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    '&:before': {
      position: 'absolute',
      content: '" "',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundImage: 'linear-gradient(-180deg, rgba(0,0,0,0.00) 58%, rgba(0,0,0,0.32) 100%)'
    },
    '&:hover': {
      '& $changeButton': {
        visibility: 'visible'
      }
    }
  },
  changeButton: {
    visibility: 'hidden',
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    backgroundColor: colors.blueGrey[900],
    color: theme.palette.common.white,
    [theme.breakpoints.down('md')]: {
      top: theme.spacing(3),
      bottom: 'auto'
    },
    '&:hover': {
      backgroundColor: colors.blueGrey[900]
    }
  },
  addPhotoIcon: {
    marginRight: theme.spacing(1)
  },
  avatar: {
    border: `2px solid ${theme.palette.common.white}`,
    height: 120,
    width: 120,
    top: -60,
    left: theme.spacing(3),
    position: 'absolute'
  },
  action: {
    marginLeft: theme.spacing(1)
  },
  fileInput: {
    display: 'none'
  }
}));

function Header({
  className,
  user,
  ...rest
}) {
  const [image,setImage]=useState('')
  const {state,dispatch}=useContext(UserContext)
  const classes = useStyles();
  const fileInputRefHeader = useRef(null);
  const [connectedStatus, setConnectedStatus] = useState(state?!state.following.includes(user._id):true);
  const handleConnectToggle = () => {
    setConnectedStatus((prevConnectedStatus) => (prevConnectedStatus === true ? false : true));
  };
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
        console.log(data)
        axios.put('/updatecover',{
            cover:data.url
        },{
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        }).then((response)=>{
            const {data}=response
            localStorage.setItem("user",JSON.stringify({
              ...state,cover:data.cover
            }))
            dispatch({type:"UPDATECOVER",payload:data.cover})
        },(error)=>{
            console.log(error)
        })
        })
      .catch(error=>{
        console.log(error)
      })
    }

  },[image])
  
  const updateCover=(file)=>{
    setImage(file)
  }
  const handleAttach = () => {
    fileInputRefHeader.current.click();
  };
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <div
        className={classes.cover}
        style={{ backgroundImage: `url(${state._id==user._id?state.cover:user.cover})` }}
      >
       {state._id===user._id && <Button
          className={classes.changeButton}
          variant="contained"
          onClick={handleAttach}
        >
          <AddPhotoIcon className={classes.addPhotoIcon} />
          Change Cover
        </Button>
       }
        <input
            className={classes.fileInput}
            ref={fileInputRefHeader}
            type="file"
            accept="image/x-png,image/gif,image/jpeg,image/jpg"
            onChange={(e)=>updateCover(e.target.files[0])}
          />
      </div>
      <Container maxWidth="lg">
        <Box
          position="relative"
          mt={1}
          display="flex"
          alignItems="center"
        >
          <Avatar
            alt="Person"
            className={classes.avatar}
            src={state._id==user._id?state.avatar:user.avatar}
          />
          <Box marginLeft="160px">
            <Typography
              variant="overline"
              color="textSecondary"
            >
              {state._id==user._id?state.designation:user.designation}
            </Typography>
            <Typography
              variant="h4"
              color="textPrimary"
            >
              {state._id==user._id?state.name:user.name}
            </Typography>
          </Box>
          <Box flexGrow={1} />
          <Hidden smDown>
            {state._id!==user._id && connectedStatus === true && (
              <Button
                onClick={handleConnectToggle}
                size="small"
                variant="outlined"
                className={classes.action}
              >
                UnFollow
              </Button>
            )}
            {state._id!==user._id && connectedStatus === false && (
              <Button
                onClick={handleConnectToggle}
                size="small"
                variant="outlined"
                className={classes.action}
              >
                Follow
              </Button>
            )}
            <Button
              color="secondary"
              component={RouterLink}
              size="small"
              to="/app/chat"
              variant="contained"
              className={classes.action}
            >
              Send message
            </Button>
          </Hidden>
          <Tooltip title="More options">
            <IconButton className={classes.action}>
              <MoreIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Container>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default Header;