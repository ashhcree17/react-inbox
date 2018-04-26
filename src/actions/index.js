export const SET_COMPOSE = 'SET_COMPOSE'
export function setCompose(compose) {
  return async (dispatch) => {
    dispatch({
      type: SET_COMPOSE,
      compose: compose
    })
  }
}

export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
export function retrieveMessages() {
  return async (dispatch) => {
    const getMessages = await fetch(`/api/messages`)
    const messagesJson = await getMessages.json()

    dispatch({
      type: MESSAGES_RECEIVED,
      messages: messagesJson._embedded.messages
    })
  }
}

export const SELECT_MESSAGE = 'SELECT_MESSAGE'
export function selectMessage(messageId) {
  return async (dispatch) => {
    dispatch({
      type: SELECT_MESSAGE,
      messageId: messageId
    })
  }
}

export const SEND_MESSAGE = 'SEND_MESSAGE'
export function sendMessage(messageDetails) {
  return async (dispatch) => {
    let response = await fetch(`/api/messages`, {
      method: 'POST',
      body: JSON.stringify(messageDetails),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    let newMessage = await response.json()
    dispatch({
      type: SEND_MESSAGE,
      newMessage: newMessage
    })
  }
}

export const ADD_LABEL = 'ADD_LABEL'
export function addLabel(messageList, label) {
  return async (dispatch) => {
    await fetch(`/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: messageList.filter(msg => msg.selected === true).map(msg => msg.id),
        command: "addLabel",
        label: label
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    dispatch({
      type: ADD_LABEL,
      label: label
    })
  }
}

export const REMOVE_LABEL = 'REMOVE_LABEL'
export function removeLabel(messageList, label) {
  return async (dispatch) => {
    await fetch(`/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: messageList.filter(msg => msg.selected === true).map(msg => msg.id),
        command: "removeLabel",
        label: label
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    dispatch({
      type: REMOVE_LABEL,
      label: label
    })
  }
}

export const TOGGLE_SELECT_MESSAGES = 'TOGGLE_SELECT_MESSAGE'
export function selectMessages(messageList) {
  let selectedCount = messageList.filter(msg => msg.selected === true).length;
  let selected = selectedCount !== messageList.length;

  return async (dispatch) => {
    dispatch({
      type: TOGGLE_SELECT_MESSAGES,
      selected: selected
    })
  }
}

export const TOGGLE_MESSAGES_READ = 'TOGGLE_MESSAGES_READ'
export function toggleMessagesRead(messageList, read) {
  return async (dispatch) => {
    await fetch(`/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: messageList.filter(msg => msg.selected === true).map(msg => msg.id),
        command: "read",
        read: read
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    dispatch({
      type: TOGGLE_MESSAGES_READ,
      read: read
    })
  }
}

export const TOGGLE_MESSAGE_STAR = 'TOGGLE_MESSAGE_STAR'
export function toggleMessageStar(message) {
  return async (dispatch) => {
    await fetch(`/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: [message.id],
        command: "star",
        star: !message.starred
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    dispatch({
      type: TOGGLE_MESSAGE_STAR,
      message: message
    })
  }
}

export const DELETE_SELECTED_MESSAGES = 'DELETE_SELECTED_MESSAGES'
export function deleteSelectedMessages(messageList) {
  return async (dispatch) => {
    let messageIds = messageList.filter(message => message.selected === true)
      .map(message => message.id)

    await fetch(`/api/messages`, {
      method: 'PATCH',
      body: JSON.stringify({
        messageIds: messageIds,
        command: "delete",
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    dispatch({
      type: DELETE_SELECTED_MESSAGES,
      messageIds: messageIds
    })
  }
}