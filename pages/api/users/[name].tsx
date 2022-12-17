import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await prisma.user.findMany({
      where: {
        name: req.query.name?.toString(),
      },
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
            nickname: true,
            sex: true,
          },
        },
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
