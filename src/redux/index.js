import { combineReducers } from "redux"

const todos = (state = '', action) => {
  switch (action.type) {
    case "SET_FILTER_VALUE":
      return action.filter
    default:
      return state
  }
}

export default combineReducers({ todos })

export const setVisibilityFilter = (filter) => ({
  type: "SET_FILTER_VALUE",
  filter,
})
