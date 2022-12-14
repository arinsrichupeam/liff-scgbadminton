import React from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  ClientConfig,
  Client,
  middleware,
  MiddlewareConfig,
  WebhookEvent,
  TextMessage,
  MessageAPIResponseBase,
} from "@line/bot-sdk";

declare let global: { lineSdk: Client };
let lineSdk: Client;

const clientConfig: ClientConfig = {
  channelAccessToken: process.env.LINE_CHANNEL,
  channelSecret: process.env.LINE_SECRET,
};

if (process.env.NODE_ENV === "production") {
  lineSdk = new Client(clientConfig);
} else {
  if (!global.lineSdk) {
    global.lineSdk = new Client(clientConfig);
  }
  lineSdk = global.lineSdk;
}
export default lineSdk;
