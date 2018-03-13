import React from 'react'

const ToolBar = ({messageList, messageListUpdate}) => {
	const selectedMessageCount = messageList.filter(message =>  message.selected === true).length;
	const unreadMessageCount = messageList.filter(message => message.read !== true).length;

  const selectButton = () => {
    if (selectedMessageCount === messageList.length) {
        messageList.map(message => message.selected = false)
    } else {
        messageList.map(message => message.selected = true)
    }
    messageListUpdate(messageList)
  }

  const markAsRead = () => {
    messageList.map(message => {
      if (message.selected === true) {
        message.read = true
        message.selected = false
      }
      return message
    } );
    messageListUpdate(messageList)
  }

  const markAsUnread = () => {
    messageList.map(message => {
      if (message.selected === true) {
        message.selected = false
        message.read = false
      }
      return message
    } );
    messageListUpdate(messageList)
  }

  const deleteSelectedMessages = () => {
    messageListUpdate(messageList.filter(message => { return message.selected !== true }))
  }

  const applyLabel = (event) => {
    messageList.map(message => {
    	let messageIndex = message.labels.indexOf(event.target.value)
      if (message.selected === true && messageIndex < 0) {
        message.labels.push(event.target.value)
      }
      return message
    })
    event.target.value = "Apply label";
    messageListUpdate(messageList)
  }

  const removeLabel = (event) => {
    messageList.map(message => {
      let messageIndex = message.labels.indexOf(event.target.value)
      if (message.selected === true && messageIndex >= 0) {
          message.labels.splice(messageIndex, 1)
      }
      return message
    })
    event.target.value = "Remove label";
    messageListUpdate(messageList)
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