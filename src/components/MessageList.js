import React from 'react'
import Message from "./Message";

const MessageList = ({messageList, onUpdate, messageListUpdate}) => {
	return (
	  <div className="MessageList">
	    {messageList.map(message =>
	    	<Message key={message.id} 
	    			message={message} 
	    			onUpdate={onUpdate}
	    			messageListUpdate={messageListUpdate} />)}
	  </div>
	);
}

export default MessageList;