export const initialState=null

export const reducer=(state,action)=>{
  switch(action.type){
    case "USER":
      return action.payload
    case "CLEAR":
      return null
    case "UPDATE":
      return {
        ...state,
        followers:action.payload.followers,
        following:action.payload.following
      }
    case "UPDATEPHOTO":
      return{
        ...state,
        photo:action.payload
      }
      case "UPDATECOVER":
        return{
          ...state,
          cover:action.payload
        }
    default:
      return state
  }
}