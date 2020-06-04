export const postinitialState=null

export const postReducer=(state,action)=>{
  switch(action.type){
    case "POST":
      return action.payload
    case "UPDATE":
      return state.map(item=>{return item._id===action.payload._id?action.payload:item})
    case "ADDPOST":
      return state.push(action.payload)
    default:
      return state
  }
}