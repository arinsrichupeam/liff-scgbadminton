import { TextMessage } from "@line/bot-sdk";
import { create } from "domain";
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
        profile: true,
      },
    });

    if (user?.profile.length != 0) {
      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email: required["email"],
          profile: {
            update: {
              where: {
                id: user?.profile[0].id ? user?.profile[0].id : "0",
              },
              data: {
                firstname: required["first_name"],
                lastname: required["last_name"],
                nickname: required["nick_name"],
                sex: required["sex"],
                phone: required["phone"],
                birthday: new Date(required["birthday"]),
                modifydate: new Date(),
              },
            },
          },
        },
      });
      console.log("Update Profile success");
    } else {
      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email: required["email"],
          profile: {
            create: {
              firstname: required["first_name"],
              lastname: required["last_name"],
              nickname: required["nick_name"],
              sex: required["sex"],
              phone: required["phone"],
              birthday: new Date(required["birthday"]),
              createdate: new Date(),
            },
          },
        },
      });
      console.log("Create Profile success");

      const response: TextMessage = {
        type: "text",
        text: `สมัครสมาชิกเรียบร้อย\n `,
      };

      await lineSdk.pushMessage(
        `${user?.accounts[0].providerAccountId}`,
        response
      );
    }

    return res.redirect(302, "/");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
