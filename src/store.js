import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  auth: { id: null, email: null, name: null, token: null },
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'set_user':
      return { ...state, auth: rest.user }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
