import MessageInput from "../components/message-input/message-input";
import { connect } from "react-redux";
import { setUsername, getRandomAvatar } from "../actions/actions";

const mapStateToProps = state => {
  return {
    avatar: state.user.avatar,
    username: state.user.username,
    message: state.user.message
  };
};

const mapDispatchToProps = dispatch => ({
  onNewMessage({ username }) {
    dispatch(setUsername(username));
    let chatMessages = JSON.parse(localStorage["redux-store"]).messages;
    let message = chatMessages.find(obj => {
      return obj.username === username;
    });
    if (
      (chatMessages.length === 0 && !message) ||
      (chatMessages.length > 0 && !message)
    ) {
      dispatch(getRandomAvatar());
    }
  }
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInput);

export default Container;
