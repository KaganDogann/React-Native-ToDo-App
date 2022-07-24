import { ADD_TO_DONING, REMOVE_TO_DOING } from "../actions/doingActions"
import { REMOVE_TO_TODO } from "../actions/toDoActions"
import { doingItems } from "../initialValues/doingItems"

const initialState = {
    doingItems:doingItems
}

export default (state = initialState, { type, payload }) => {
    console.log("doingReducer içi payload:", payload)
  switch (type) {

  case ADD_TO_DONING:
    return { 
        ...state, 
        doingItems:[...state.doingItems,{id:payload.id,content:payload.content}]
    }

    case REMOVE_TO_DOING:
      return {
        ...state,
        doingItems: state.doingItems.filter((t)=>t.id !==payload.id)
      }
 

  default:
    return state
  }
}
