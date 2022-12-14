import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await prisma.user.findMany({
      where: {
        email: req.query.email?.toString(),
      },
      include: {
        _count: {
          select: {
            covidCheckin: true,
          },
        },
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}
