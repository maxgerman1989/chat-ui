import { connect } from "react-redux";
import ChatMessages from "../components/chat-messages/chat-messages";

const mapStateToProps = state => {
  return {
    username: state.user.username,
    messages: state.messages
  };
};

const Container = connect(mapStateToProps)(ChatMessages);

export default Container;
