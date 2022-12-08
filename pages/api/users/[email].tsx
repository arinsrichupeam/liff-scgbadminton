import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
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

    console.log(result);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
