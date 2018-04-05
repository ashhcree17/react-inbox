import React from 'react'

const Message = ({message, onUpdate, messageListUpdate}) => {
  const messageStyle = () => {
    let rowMessage = "row message"
    message.selected ? rowMessage +=  " selected" : rowMessage = rowMessage
    message.read ? rowMessage +=  " read" : rowMessage +=  " unread"
    return rowMessage;
  }

  const toggleSelect = () => {
    message.selected ? message={...message,selected: false} 
      : message={...message,selected: true}
    onUpdate(message)
  }

  const toggleStar = () => {
    const starredMessage = {
      messageIds: [message.id],
      command: "star",
      star: !message.starred
    }

    messageListUpdate(starredMessage)
  }

  return (
    <div className={messageStyle()}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" onChange={toggleSelect} checked={!!message.selected}/>
          </div>
          <div className="col-xs-2">
            <i className={message.starred ? "star fa fa-star" : "star fa fa-star-o"} onClick={toggleStar}/>
          </div>
        </div>
      </div>

      <div className="col-xs-11">
        {message.labels.map(label => <span key={label} className="label label-warning">{label}</span>)}
        <a href="#">{message.subject}</a>
      </div>
    </div>)
}

export default Message;