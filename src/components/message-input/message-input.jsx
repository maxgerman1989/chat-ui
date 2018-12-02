import React, { Component } from "react";
import { Image, List, Card, Divider } from "semantic-ui-react";
import { CardHeader, CardText, CardActions } from "material-ui/Card";
import TextField from "material-ui/TextField";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { socketConnect } from "socket.io-react";

import "./message-input.scss";

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.avatar,
      message: props.message,
      username: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleUserKeyUp = this.handleUserKeyUp.bind(this);
  }

  onSubmit = event => {
    event.preventDefault();
    this.props.onNewMessage({
      username: this.state.username
    });

    this.props.socket.emit("spotim/chat", {
      avatar: this.state.avatar,
      username: this.state.username,
      date: new Date().toLocaleString(),
      text: this.state.message
    });
    this.setState({ message: "" });
  };
  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handleMessageChange = event => {
    this.setState({ message: event.target.value });
  };

  handleUserKeyUp = event => {
    let chatMessages = JSON.parse(localStorage["redux-store"]).messages;
    let message = chatMessages.find(obj => {
      return obj.username === event.target.value;
    });
    if (chatMessages.length > 0 && message) {
      this.setState({ avatar: message.avatar });
    } else {
      this.setState({ avatar: this.props.avatar });
    }
  };

  render() {
    const { avatar, username } = this.state;
    return (
      <form className="messageForm" onSubmit={this.onSubmit}>
        <Card>
          <Card.Content>
            <CardHeader title={username} avatar={avatar} />
            <CardText>
              <TextField
                hintText="Enter a name"
                onKeyUp={this.handleUserKeyUp}
                value={username}
                onChange={this.handleUsernameChange}
                required
              />
              <TextField
                hintText="Enter a message"
                value={this.state.message}
                onChange={this.handleMessageChange}
                required
              />
            </CardText>
            <CardActions>
              <FloatingActionButton className="sendButton" type="submit">
                Send
              </FloatingActionButton>
            </CardActions>
          </Card.Content>
        </Card>
      </form>
    );
  }
}

export default socketConnect(MessageInput);
