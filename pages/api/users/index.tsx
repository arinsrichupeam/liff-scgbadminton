import { TextMessage } from "@line/bot-sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import lineSdk from "../line";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getAlllUser(res);
    case "POST":
      return await createProfile(req, res);
  }
}
const getAlllUser = async (res: NextApiResponse) => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      image: true,
      accounts: {
        select: {
          access_token: true,
          providerAccountId: true,
        },
      },
      profile: {
        select: {
          birthday: true,
          phone: true,
          firstname: true,
          lastname: true,
          sex: true,
        },
      },
    },
  });

  return res.status(200).json(result);
};

const createProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { body: required } = req;

    await prisma.user.update({
      where: {
        email: required["email"],
      },
      data: {
        profile: {
          create: {
            firstname: required["first_name"],
            lastname: required["last_name"],
            nickname: required["nick_name"],
            sex: required["sex"],
            phone: required["phone"],
            birthday: new Date(required["birthday"]),
          },
        },
      },
    });

    console.log("createProfile success");

    const account = await prisma.user.findUnique({
      where: {
        email: required["email"],
      },
      include: {
        accounts: {
          select: {
            providerAccountId: true,
          },
        },
      },
    });

    const response: TextMessage = {
      type: "text",
      text: `สมัครสมาชิกเรียบร้อย\n `,
    };

    await lineSdk.pushMessage(
      `${account?.accounts[0].providerAccountId}`,
      response
    );

    return res.redirect(302, "/checkin");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
