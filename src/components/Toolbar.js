import React from 'react'

const ToolBar = ({messageList, messageListUpdate, toggleCompose, handleSelectedMessage}) => {
	const selectedMessageCount = messageList.filter(message =>  message.selected === true).length;
	const unreadMessageCount = messageList.filter(message => message.read !== true).length;

  const selectButton = () => {
    if (selectedMessageCount === messageList.length) {
        messageList.map(message => message.selected = false)
    } else {
        messageList.map(message => message.selected = true)
    }
    handleSelectedMessage(messageList)
  }

  const markAsRead = () => {
  	let messageIds = messageList.filter(
  		message => message.selected === true)
  		.map(message => message.id)

    messageListUpdate({
      messageIds: messageIds,
      command: "read",
      read: true
    })
  }

  const markAsUnread = () => {
  	let messageIds = messageList.filter(
  		message => message.selected === true)
  		.map(message => message.id)

    messageListUpdate({
      messageIds: messageIds,
      command: "read",
      read: false
    })
  }

  const deleteSelectedMessages = () => {
  	let messageIds = messageList.filter(
  		message => message.selected === true)
  		.map(message => message.id)

    messageListUpdate({
      messageIds: messageIds,
      command: "delete"
    })  
  }

  const applyLabel = (event) => {
  	let messageIds = messageList.filter(
  		message => message.selected === true)
  		.map(message => message.id)

		event.target.value = "Apply label"
    messageListUpdate({
      messageIds: messageIds,
      command: "applyLabel",
      label: event.target.value
    })
  }

  const removeLabel = (event) => {
  	let messageIds = messageList.filter(
  		message => message.selected === true)
  		.map(message => message.id)

		event.target.value = "Remove label"
    messageListUpdate({
      messageIds: messageIds,
      command: "removeLabel",
      label: event.target.value
    })
  }

  const disabled = () => {
    if (selectedMessageCount === 0) {
      return "disabled"
    }
  }

  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">
          	{unreadMessageCount}
          </span>
          {unreadMessageCount === 1 ? "unread message" : "unread messages"}
        </p>

        <a className="btn btn-danger" onClick={toggleCompose}>
        	<i className="fa fa-plus"/>
      	</a>

        <button className="btn btn-default" onClick={selectButton}>
          <i className={`fa fa-${selectedMessageCount === 0 ? "square-o" :
						selectedMessageCount > 0 && selectedMessageCount !== messageList.length ? "minus-square-o" 
							: "check-square-o"}`}></i>
        </button>

        <button className="btn btn-default" onClick={markAsRead} disabled={disabled()}>
          Mark As Read
        </button>

        <button className="btn btn-default" onClick={markAsUnread} disabled={disabled()}>
          Mark As Unread
        </button>

        <select className="form-control label-select" onChange={applyLabel} disabled={disabled()}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" onChange={removeLabel} disabled={disabled()}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
	      </select>

	      <button className="btn btn-default" onClick={deleteSelectedMessages} disabled={disabled()}>
	        <i className="fa fa-trash-o"></i>
	      </button>
      </div>
    </div>
    )
}

export default ToolBar