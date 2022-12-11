import { Profile, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getProfile(req, res);
    case "POST":
      return await createProfile(req, res);
  }
}

const createProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { body: required } = req;
    // await prisma.user.update({
    //   where: {
    //     email: required["email"],
    //   },
    //   data: {
    //     profile: {
    //       create: {
    //         firstname: required["first_name"],
    //         lastname: required["last_name"],
    //         nickname: required["nick_name"],
    //         sex: required["sex"],
    //         phone: required["phone"],
    //         birthday: new Date(required["birthday"]),
    //       },
    //     },
    //   },
    // });

    console.log("call even register");

    return res.redirect(307, "/checkin");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { body: required } = req;
    console.log(required);

    const result = await prisma.user.findUnique({
      where: {
        email: req.query.email?.toString(),
      },
      select: {
        id: true,
        email: true,
        image: true,
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
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
