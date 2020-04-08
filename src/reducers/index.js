import {
  PUT_USER_IN_QUEUE,
  WS_REQUEST,
  WS_RESPONSE,
  TOP_ERROR,
  TIMER_START,
  TIMER_STOP,
  TIMER_OUT,
  TIMER_TACT,
  EDIT_NAME,
  TOGGLE_HISTORY
} from "./constants"


const initialUserState = {
  putUserInQueue: {},
  wsRequest: {},
  wsResponse: {},
  topError: {},
  timerStart: {},
  timerStop: {},
  timerOut: {},
  timerTact: {},
  editName: {},
  toggleHistory: {},
}

const reducers = (state = initialUserState, action) => {
  switch (action.type) {
    case PUT_USER_IN_QUEUE:
      return { ...state, putUserInQueue: action }
    case WS_REQUEST:
      return { ...state, wsRequest: action }
    case WS_RESPONSE:
      return { ...state, wsResponse: action }
    case TOP_ERROR:
      return { ...state, topError: action }
    case TIMER_START:
      return { ...state, timerStart: action }
    case TIMER_STOP:
      return { ...state, timerStop: action }
    case TIMER_OUT:
      return { ...state, timerOut: action }
    case TIMER_TACT:
      return { ...state, timerTact: action }
    case EDIT_NAME:
      return { ...state, editName: action }
    case TOGGLE_HISTORY:
      return { ...state, toggleHistory: action }

    default:
      return state
  }
}

export default reducers
