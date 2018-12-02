//This is your top level React component, you may change everything

import React from "react";
import logo from "../assets/spotim-logo.jpg";
import { Container, Image } from "semantic-ui-react";
import styled from "styled-components";
import { createStore } from "redux";
import appReducer from "../reducers/reducers";
import io from "socket.io-client";
import { Provider } from "react-redux";
import { SocketProvider } from "socket.io-react";
import ChatMessages from "../containers/ChatMessagesContainer";
import MessageInput from "../containers/MessageInputContainer";
import { getRandomAvatar, addMessage } from "../actions/actions";
import { MuiThemeProvider } from "material-ui/styles";
import "./index.scss";

const Logo = styled.div`
  img {
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
  }
`;

let initialState = {
  user: {
    avatar: "",
    username: "",
    message: ""
  },
  messages: []
};
const data = localStorage["redux-store"]
  ? JSON.parse(localStorage["redux-store"])
  : initialState;
const store = createStore(appReducer, data);
store.subscribe(
  () => (localStorage["redux-store"] = JSON.stringify(store.getState()))
);
store.getState().user.avatar || store.dispatch(getRandomAvatar());
const socket = io.connect("https://spotim-demo-chat-server.herokuapp.com");
socket.on("spotim/chat", msg => {
  store.dispatch(addMessage(msg.avatar, msg.username, msg.date, msg.text));
});

class App extends React.PureComponent {
  render() {
    return (
      <Container className={"spotim-header"}>
        <div className={"spotim-title"}>Welcome to the Spot.IM Chat app</div>
        <div>
          <Logo>
            <Image size={"tiny"} src={logo} />
          </Logo>
        </div>
        <div className="chat-component">
          <MuiThemeProvider>
            <Provider store={store}>
              <SocketProvider socket={socket}>
                <ChatMessages />
                <MessageInput />
              </SocketProvider>
            </Provider>
          </MuiThemeProvider>
        </div>
      </Container>
    );
  }
}

export default App;
