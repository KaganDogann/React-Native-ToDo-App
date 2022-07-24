export const ADD_TO_DONE = "ADD_TO_DONE"
export const REMOVE_TO_DONE = "REMOVE_TO_DONE"

export const addTaskToDone = (task) => ({
  type: ADD_TO_DONE,
  payload:task
})

export const removeTaskToDone = (task) => ({
  type: REMOVE_TO_DONE,
  payload:task
})
