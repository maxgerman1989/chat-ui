import React, { Component } from "react";
import Message from "./components/message/message";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { MuiThemeProvider } from "material-ui/styles";
const puppeteer = require("puppeteer");

global.navigator = { userAgent: "all" };

//Snapshot of the message component
describe("Message component", () => {
  test("Message Component Snapshot", () => {
    let date = new Date(2018, 11, 2, 10).toLocaleString();
    const tree = renderer
      .create(
        <MuiThemeProvider>
          <Message
            avatar="https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png"
            username="max"
            date={date}
            message="message"
            highlightMessage={true}
          />
        </MuiThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

//Testing the message input component to send a message to the server.
describe("Message Input component", () => {
  test("Can send message form", async () => {
    let browser = await puppeteer.launch({
      headless: false,
      devtools: true
    });
    let chatMessage = {
      username: "max",
      message: "hey!"
    };
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 900
      },
      userAgent: ""
    });

    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".messageForm");
    await page.click("input[name=username]");
    await page.type("input[name=username]", chatMessage.username);
    await page.click("input[name=message]");
    await page.type("input[name=message]", chatMessage.message);
    await page.click("button[type=submit]");

    browser.close();
  }, 9000000);
});
