import type { NextApiRequest, NextApiResponse } from "next";
import { redirect } from "next/dist/server/api-utils";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
    case "POST":
      return await insertCheckin(req, res);
  }
}

const insertCheckin = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { body: required } = req;
    // console.log(required);
    
    return res.redirect(302, "/thankyou");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
