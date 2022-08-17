import { ADD_TO_TODO, REMOVE_TO_TODO } from "../actions/toDoActions"
import { toDoItems } from "../initialValues/toDoItems"


const initialState = {
  toDoItems: toDoItems
}
let taskID = 7;

export default (state = initialState, { type, payload }) => {
  //console.log("toDo reducer içi payload:", payload)
  switch (type) {

    case ADD_TO_TODO:
      taskID++
      return {
        ...state,
        toDoItems: [...state.toDoItems, { id: `${taskID}`, content: payload.task.content }],

      }

    case REMOVE_TO_TODO:
      return {
        ...state,
        toDoItems: state.toDoItems.filter((t)=>t.id !==payload.task.id)
      }

    default:
      return state
  }
}
