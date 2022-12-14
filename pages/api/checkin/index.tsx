import { TextMessage } from "@line/bot-sdk";
import { Decimal } from "@prisma/client/runtime";
import type { NextApiRequest, NextApiResponse } from "next";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useEffect, useState } from "react";
import prisma from "../../../lib/prisma";
import lineSdk from "../line";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return await insertCheckin(req, res);
  }
}
function formatDate(string: string) {
  return new Date(string).toLocaleString();
}

const insertCheckin = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { body: required } = req;
    const obj = JSON.stringify({
      Q1: `${required["q1"]}`,
      Q2: `${required["q2"]}`,
    });

    await prisma.user.update({
      where: {
        email: required["email"],
      },
      data: {
        covidCheckin: {
          create: {
            temp: parseFloat(required["temp"]),
            cordNumber: parseInt(required["coad_number"]),
            question: obj,
            checkinTime: new Date(required["checkin_time"]),
          },
        },
      },
    });

    console.log(
      `covidCheckin success :  ${formatDate(required["checkin_time"])}`
    );

    const response: TextMessage = {
      type: "text",
      text: `Checkin At : \n ${required["checkin_time"]} \n Cord Number: ${required["coad_number"]}`,
    };

    await lineSdk.pushMessage(`${required["uid"]}`, response);

    return res.redirect(302, "/thankyou");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
