import React from 'react'
import Message from "./Message";

const MessageList = ({messageList, onUpdate}) => {
	return (
	  <div className="MessageList">
	    {messageList.map(message =>
	    	<Message key={message.id} 
	    			message={message} 
	    			onUpdate={onUpdate} />)}
	  </div>
	);
}

export default MessageList;