import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getByToday(req, res);
    case "POST":
      return await getbyBetween(req, res);
  }
}

const getData = async (start: Date, end: Date) => {
  return await prisma.covidCheckin.findMany({
    distinct: ["checkinTime"],
    where: {
      checkinTime: {
        gte: start,
        lte: end,
      },
    },
    select: {
      id: true,
      temp: true,
      cordNumber: true,
      question: true,
      checkinTime: true,
      user: {
        select: {
          name: true,
          image: true,
          email: true,
          profile: {
            select: {
              firstname: true,
              lastname: true,
              phone: true,
            },
          },
        },
      },
    },
  });
};

const getByToday = async (req: NextApiRequest, res: NextApiResponse) => {
  const today = new Date().toDateString();

  const start = new Date(today);
  const end = new Date(today);
  end.setDate(start.getDate() + 1);

  const result = await getData(start, end);
  console.log(result.length);
  res.status(200).json(result);
};

const getbyBetween = async (req: NextApiRequest, res: NextApiResponse) => {
  const start = new Date(`${req.body["start"]}`);
  const end = new Date(`${req.body["end"]}`);
  end.setDate(end.getDate() + 1);

  const result = await getData(start, end);
  res.status(200).json(result);
};
