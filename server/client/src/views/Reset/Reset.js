import React,{useState,useContext, useEffect} from 'react'
import { Link,useHistory,useParams} from "react-router-dom";
import {makeStyles,createStyles} from '@material-ui/styles'
import Alert from '@material-ui/lab/Alert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';
import validate from 'validate.js'

import {
  Grid,
  Button,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  }
};
const useStyles = makeStyles(theme => createStyles({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%',

  },
  card:{
    padding: "20px",
    maxWidth:"700px",
    margin:"50px auto",
    
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  CircularProgress:{
    textAlign:"center",
    color:theme.palette.white
  }
}));

const ResetPassword=()=>{
  const classes = useStyles();
  const history=useHistory()
  const [serverState,setServerState]=useState({
    isServer:false,
    message:''
  })
  const [loading,setLoading]=useState(false)
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const handleClose = () => {
    setServerState(serverState=>({
      isServer:false,
      message:''
    }))
  };
  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };
  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleBack = () => {
    history.goBack();
  };
  
  
  const handleReset=()=>{   
    setLoading(true) 
    axios.post('/resetLink',{
      email:formState.values.email
    },{
      headers:{
        "Content-Type":"application/json"
      }
    }).then((response)=>{
      setLoading(false)
      history.push('/login')

    },(error)=>{
      if(error.response.data)
      {
        setLoading(false)
        setServerState(serverState=>({
          isServer:true,
          message:error.response.data.error
        }))
      }
    })
    
  }
  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;
  
  return(
    <div className={classes.root}>
    <Card className={classes.card} variant="outlined">
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                 Reset Password
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  Try to change password monthly!
                </Typography>
                <TextField
                      className={classes.textField}
                      error={hasError('email')}
                      fullWidth
                      helperText={
                        hasError('email') ? formState.errors.email[0] : null
                      }
                      label="Email address"
                      name="email"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.oauthProvider?'':formState.values.email || ''}
                      variant="outlined"
                  />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={()=>handleReset()}
                >
                {loading && <CircularProgress className={classes.CircularProgress}/>}
                  Reset Password Link
                </Button>
              </form>
            </div>
          </div>
    </Card>
  <Snackbar
    anchorOrigin={{ vertical:'top', horizontal:'center' }}
    open={serverState.isServer}
    autoHideDuration={3000}
    onClose={handleClose}
    key='top center'
  >
    <Alert  variant="filled" severity="error">
    {serverState.message}
    </Alert>
  </Snackbar>
  
</div>

  )
}

export default ResetPassword