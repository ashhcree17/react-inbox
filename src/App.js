import React from 'react';
import './App.css';
import MessageList from "./components/MessageList";
import Toolbar from "./components/Toolbar";
import ComposeMessageForm from "./components/ComposeMessageForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const App = ({ compose }) => {
  return (
    <div>
      <Toolbar/>
      {compose ? <ComposeMessageForm/> : null}
      <MessageList/>
    </div>
  );
}

const mapStateToProps = state => ({
  compose: state.messages.compose,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
