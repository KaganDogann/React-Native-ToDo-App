export const ADD_TO_TODO = "ADD_TO_TODO"
export const REMOVE_TO_TODO = "REMOVE_TO_TODO"

export function addToToDo(task) {
  //console.log("task:",task)
    return {
      type: ADD_TO_TODO,
      payload: {task}
    }
  }

  export function removeToToDo(task) {
    return {
      type: REMOVE_TO_TODO,
      payload:{task}
    }
  }