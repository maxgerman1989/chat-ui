import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import { CardHeader, CardText } from "material-ui/Card";

import "./message.scss";

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { avatar, username, date, message, highlightMessage } = this.props;
    return (
      <Card className={highlightMessage ? "message highlight" : "message"}>
        <Card.Content>
          <CardHeader avatar={avatar} title={username} subtitle={date} />
          <CardText className="messageContent">{message}</CardText>
        </Card.Content>
      </Card>
    );
  }
}

export default Message;
