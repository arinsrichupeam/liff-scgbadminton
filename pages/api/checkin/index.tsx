import { TextMessage } from "@line/bot-sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import lineSdk from "../line";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return await insertCheckin(req, res);
    case "GET":
      return await getAllCheckin(res);
  }
}
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString();
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

    return res.redirect(302, "/thankyou");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getAllCheckin = async (res: NextApiResponse) => {
  try {
    const checkincount = await prisma.covidCheckin.findMany({
      distinct: ["checkinTime"],
    });

    res.status(200).json(checkincount);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
