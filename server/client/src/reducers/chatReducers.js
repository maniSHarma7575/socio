import produce from 'immer'
import {
  GET_CONTACTS,
  GET_THREADS,
  GET_THREAD,
  MARK_THREAD_AS_SEEN,
  ADD_MESSAGE,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  INIT_SOCKET
} from '../actions/chatActions'
import objFromArray from '../utils/objFromArray';

const initialState = {
  contacts: {
    chatContacts:[]
  },
  threads: {
    chatThreads:[]
  },
  socket:null,
  sidebarOpen: false
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACTS: {
      console.log(action.payload)
      return produce(state,(draft)=>{
        draft.contacts.chatContacts=[...action.payload.result]
      })
    }

    case GET_THREADS: {
      return produce(state, (draft) => {
        draft.contacts.chatThreads=[...action.payload.result]
      });
    }

    case GET_THREAD: {
      const { thread } = action.payload;

      return produce(state, (draft) => {
        draft.threads.byKey[thread.key] = thread;

        if (!draft.threads.allKeys.includes(thread.key)) {
          draft.threads.allKeys.push(thread.key);
        }
      });
    }

    case MARK_THREAD_AS_SEEN: {
      const { threadKey } = action.payload;

      return produce(state, (draft) => {
        const thread = draft.threads.byKey[threadKey];

        if (thread) {
          thread.unreadCount = 0;
        }
      });
    }

    case ADD_MESSAGE: {
      const {
        threadKey,
        message,
        userId,
        otherUserId
      } = action.payload;

      return produce(state, (draft) => {
        let thread = draft.threads.byKey[threadKey];

        if (!thread) {
          thread = {
            key: threadKey,
            messages: [message],
            participantIds: [otherUserId, userId],
            unreadCount: 0
          };

          draft.threads.byKey[threadKey] = thread;
          draft.threads.allKeys.push(threadKey);
        } else {
          thread.messages.push(message);
        }
      });
    }

    case OPEN_SIDEBAR: {
      return produce(state, (draft) => {
        draft.sidebarOpen = true;
      });
    }

    case CLOSE_SIDEBAR: {
      return produce(state, (draft) => {
        draft.sidebarOpen = false;
      });
    }

    case INIT_SOCKET:
      return {
        ...state,
        socket: action.payload
      };

    default: {
      return state;
    }
  }
};

export default chatReducer;
