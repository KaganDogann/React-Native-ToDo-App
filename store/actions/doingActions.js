export const ADD_TO_DONING = "ADD_TO_DONING"
export const REMOVE_TO_DOING = "REMOVE_TO_DOING"

export const addTaskToDoing = (task) => ({
  type: ADD_TO_DONING,
  payload:task
})

export const removeTaskToDoing = (task) => ({
  type: REMOVE_TO_DOING,
  payload: task
})
