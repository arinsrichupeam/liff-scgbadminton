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

    const user = await prisma.user.findUnique({
      where: {
        id: required["uid"],
      },
      include: {
        accounts: {
          select: {
            providerAccountId: true,
          },
        },
      },
    });

    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        covidCheckin: {
          create: {
            checkinTime: new Date(required["checkin_time"]),
            temp: parseFloat(required["temp"]),
            question: obj,
          },
        },
      },
    });

    console.log(
      `covidCheckin success :  ${formatDate(required["checkin_time"])}`
    );

    const response: TextMessage = {
      type: "text",
      text: `Checkin At : ${required["checkin_time"]}`,
    };

    await lineSdk.pushMessage(
      `${user?.accounts[0].providerAccountId}`,
      response
    );

    return res.redirect(302, "/thankyou");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
