import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  addLabel,
  removeLabel,
  deleteSelectedMessages,
  selectMessages,
  setCompose,
  toggleMessagesRead
} from "../actions"

const ToolBar = ({ messageList, compose, toggleMessagesRead, setCompose, selectMessages, deleteSelectedMessages, addLabel, removeLabel }) => {
	const selectedMessageCount = messageList.filter(message =>  message.selected === true).length;
	const unreadMessageCount = messageList.filter(message => message.read !== true).length;

  const toggleCompose = () => {
    setCompose(!compose)
  }

  const selectButton = () => {
    selectMessages(messageList)
  }

  const markAsRead = () => {
    toggleMessagesRead(messageList, true)
  }

  const markAsUnread = () => {
    toggleMessagesRead(messageList, false)
  }

  const deleteMessages = () => {
  	 deleteSelectedMessages(messageList)
  }

  const applyMessageLabel = (event) => {
    addLabel(messageList, event.target.value)
    event.target.value = "Apply label"
  }

  const removeMessageLabel = (event) => {
    removeLabel(messageList, event.target.value)
    event.target.value = "Remove label"
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

        <select className="form-control label-select" onChange={applyMessageLabel} disabled={disabled()}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" onChange={removeMessageLabel} disabled={disabled()}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
	      </select>

	      <button className="btn btn-default" onClick={deleteMessages} disabled={disabled()}>
	        <i className="fa fa-trash-o"></i>
	      </button>
      </div>
    </div>
    )
}

const mapStateToProps = state => ({
  messageList: state.messages.all,
  compose: state.messages.compose
})

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleMessagesRead: toggleMessagesRead,
  setCompose: setCompose,
  deleteSelectedMessages: deleteSelectedMessages,
  addLabel: addLabel,
  selectMessages: selectMessages,
  removeLabel: removeLabel,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolBar)