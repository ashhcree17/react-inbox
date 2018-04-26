import {combineReducers} from 'redux'
import {
  SEND_MESSAGE, 
  ADD_LABEL, 
  DELETE_SELECTED_MESSAGES, 
  MESSAGES_RECEIVED, 
  REMOVE_LABEL, 
  SELECT_MESSAGE,
  SET_COMPOSE, 
  TOGGLE_MESSAGE_STAR, 
  TOGGLE_MESSAGES_READ, 
  TOGGLE_SELECT_MESSAGES
} from "../actions"

function messages(state = {compose: false, all: []}, action) {
  switch (action.type) {
    case MESSAGES_RECEIVED:
      return {
        ...state,
        all: action.messages
      }
    case SET_COMPOSE:
      return {
        ...state,
        compose: action.compose
      }
    case SEND_MESSAGE:
      return {
        ...state,
        compose: false,
        all: [
          ...state.all,
          action.newMessage
        ]
      }
    case SELECT_MESSAGE:
      let updatedItem = state.all.find(message => message.id === action.messageId)

      return {
        ...state,
        all: [
          ...state.all.splice(0, state.all.indexOf(updatedItem)),
          {
            ...updatedItem,
            selected: !updatedItem.selected
          },
          ...state.all.splice(state.all.indexOf(updatedItem) + 1)
        ]
      }
    case TOGGLE_SELECT_MESSAGES:
      return {
        ...state,
        all: state.all.map(message => (
          {
            ...message,
            selected: action.selected
          })
        )
      }
  	case TOGGLE_MESSAGES_READ:
      return {
        ...state,
        all: state.all.map(message => { 
          if (message.selected === true) {
            message.selected = false;
            message.read = action.read;
          }
          return message;
        })
      }
	  case TOGGLE_MESSAGE_STAR:
      return {
        ...state,
        all: [
          ...state.all.splice(0, state.all.indexOf(action.message)),
          {
            ...action.message,
            starred: !action.message.starred
          },
          ...state.all.splice(state.all.indexOf(action.message) + 1)
        ]
      }
    case DELETE_SELECTED_MESSAGES:
      return {
        ...state,
        all: state.all.filter(message => message.selected !== true)
      }
	  case ADD_LABEL:
      return {
        ...state,
        all: state.all.map(message => {
          if (message.selected === true) {
            message.selected = false;

            if (message.labels.indexOf(action.label) < 0) {
              message.labels.push(action.label)
            }
          }
          return message;
        })
      }
	  case REMOVE_LABEL:
      return {
        ...state,
        all: state.all.map(message => {
          let labelIndex = message.labels.indexOf(action.label)

          if (message.selected === true) {
              message.selected = false;

              if (labelIndex >= 0) {
                  message.labels.splice(labelIndex, 1)
              }
          }
          return message;
        })
      }
	  default:
      return state
  }
}

export default combineReducers({ messages })