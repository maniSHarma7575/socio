import React, {
  useEffect,
  useRef,
  useContext
} from 'react';
import {
  useHistory,
  useParams
} from 'react-router';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Divider,
  makeStyles
} from '@material-ui/core';
import {
  markThreadAsSeen,
  getThread
} from '../../../actions/chatActions';
import Toolbar from './Toolbar';
import Message from '../Message';
import MessageAdd from '../MessageAdd';
import {UserContext} from '../../../App'

function threadSelector(state,reduxState, threadKey, history) {
  const { threads, contacts } = reduxState.chat;
  const thread = threads.chatThreads.filter((threadItem)=>threadItem._id==threadKey)
  // When starting a new thread, we don't have it in store
  // So we can create a temporary new one where threadKey is the contact username
  if (!thread.length) {
    const contactId=contacts.chatContacts.filter((contact)=>contact._id==threadKey)
    if (!contactId.length) {
      history.push('/app/chat/new');
    }
    return {
      key: threadKey,
      type: 'ONE_TO_ONE', // We might add GROUP type in future
      participantIds: [contactId[0]._id, state._id],
      messages: []
    };
  }

  return thread;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.dark
  }
}));

function ThreadDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { threadKey } = useParams();
  const history = useHistory();
  const {state}=useContext(UserContext)
  const thread = useSelector((rstate) => threadSelector(state,rstate, threadKey, history));
  const messagesRef = useRef(null);
  function scrollMessagesToBottom() {
    if (messagesRef.current) {
      // eslint-disable-next-line no-underscore-dangle
      messagesRef.current._container.scrollTop = messagesRef.current._container.scrollHeight;
    }
  }

  useEffect(() => {
   dispatch(getThread(threadKey));
   dispatch(markThreadAsSeen(threadKey));
  }, [dispatch, threadKey]);
  

  useEffect(() => {
    if (thread) {
      scrollMessagesToBottom();
    }
    // eslint-disable-next-line
  }, [thread.messages]);

  if (!thread) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Toolbar thread={thread} />
      <Divider />
      <Box
        flexGrow={1}
        p={2}
        ref={messagesRef}
        component={PerfectScrollbar}
        options={{ suppressScrollX: true }}
      >
        {thread.messages && thread.messages.length > 0 && thread.messages.map((message) => (
          <Message
            key={message._id}
            message={message}
          />
        ))}
      </Box>
      <Divider />
      <MessageAdd thread={thread} />
    </div>
  );
}

export default ThreadDetails;