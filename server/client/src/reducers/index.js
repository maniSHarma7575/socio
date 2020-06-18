import {combineReducers} from 'redux'
import chatReducer from './chatReducers'

const rootReducer=combineReducers({
  chat:chatReducer
})

export default rootReducer