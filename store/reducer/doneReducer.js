import { ADD_TO_DONE, REMOVE_TO_DONE } from "../actions/doneActions"
import { doneItems } from "../initialValues/doneItems"

const initialState = {
    doneItems: doneItems
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case ADD_TO_DONE:
            return {
                ...state,
                doneItems: [...state.doneItems, { id: payload.id, content: payload.content }]
            }

            case REMOVE_TO_DONE:
                return {
                  ...state,
                  doneItems: state.doneItems.filter((t)=>t.id !==payload.id)
                }

        default:
            return state
    }
}
