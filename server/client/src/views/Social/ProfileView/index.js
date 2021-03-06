import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import axios from '../../../../src/utils/axios';
import useIsMountedRef from '../../../../src/hooks/useIsMountedRef';
import Page from '../../../../src/components/Page';
import Header from './Header';
import Timeline from './Timeline';
import Connections from './Connections';
import Projects from './Projects';
import Reviews from './Reviews';
import {useParams} from 'react-router-dom'
import { SnackbarProvider } from "notistack";

const tabs = [
  { value: 'timeline', label: 'Timeline' },
  { value: 'connections', label: 'Connections' },
  { value: 'projects', label: 'Projects' },
  { value: 'reviews', label: 'Reviews' }
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  }
}));

function ProfileView() {
  const {userid}=useParams()
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [currentTab, setCurrentTab] = useState('timeline');
  const [user, setUser] = useState(null);
  

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const getPosts = useCallback(() => {
    axios
      .get(`/user/${userid}`,{
        headers:{
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
      })
      .then((response) => {
        if (isMountedRef.current) {
          setUser(response.data.user);
        }
      });
  }, [isMountedRef,userid]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (!user) {
    return null;
  }
  return (
    <SnackbarProvider>
    <Page
      className={classes.root}
      title="Profile"
    >
      <Header user={user} />
      <Container maxWidth="lg">
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            textColor="secondary"
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <Box
          py={3}
          pb={6}
        >
          {currentTab === 'timeline' && <Timeline user={user} />}
          {currentTab === 'connections' && <Connections user={user}/>}
          {currentTab === 'projects' && <Projects />}
          {currentTab === 'reviews' && <Reviews />}
        </Box>
      </Container>
    </Page>
    </SnackbarProvider>
  );
}

export default ProfileView;