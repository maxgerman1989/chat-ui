import TYPES from "./types";

const images = [
  "https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png",
  "https://spotim-demo-chat-server.herokuapp.com/avatars/002-psyduck.png",
  "https://spotim-demo-chat-server.herokuapp.com/avatars/003-pikachu.png",
  "https://spotim-demo-chat-server.herokuapp.com/avatars/004-jigglypuff.png",
  "https://spotim-demo-chat-server.herokuapp.com/avatars/005-bullbasaur.png"
];

export function setUsername(username) {
  return {
    type: TYPES.SET_USERNAME,
    data: username
  };
}

export function addMessage(avatar, username, date, message) {
  return {
    type: TYPES.ADD_MESSAGE,
    data: { avatar, username, date, message }
  };
}

export function getRandomAvatar() {
  let index = Math.floor(Math.random() * images.length);
  let avatar = images[index];
  return {
    type: TYPES.SET_AVATAR,
    data: avatar
  };
}
