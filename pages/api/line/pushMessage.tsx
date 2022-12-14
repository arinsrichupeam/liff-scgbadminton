import { TextMessage } from "@line/bot-sdk";
import { NextApiRequest, NextApiResponse } from "next";
import React from "react";
import lineSdk from ".";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method;
  const { body: body } = req;

  switch (body.from) {
    case "register":
      return await register(req, res);
    case "checkin":
      return await checkin(req, res);
  }
}

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const response: TextMessage = {
    type: "text",
    text: `สมัครสมาชิกเรียบร้อย\n `,
  };
  await lineSdk.pushMessage("Udd611add626ecfaf01162e056eb76652", response);
  return res.status(200).json("From register");
};

const checkin = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json("From checkin");
};
