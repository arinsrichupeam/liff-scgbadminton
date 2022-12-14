import { TextMessage } from "@line/bot-sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import Email from "next-auth/providers/email";
import { useEffect } from "react";
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

    console.log("register success");

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

    // console.log(account?.accounts);

    // await fetch(`/api/line/pushMessage/`,{
    //     method:"POST",
    //     body: JSON.stringify({"form":"register"})
    // });

    // const account = await prisma.account.findMany({
    //   where:{
    //     userId:""
    //   }
    // })

    // console.log(account);

    // const value = JSON.parse(stored?.toString());

    // console.log("PP: ");

    // const fetchData = async () => {
    //   await fetch(`/api/users/${required["email"]}`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log("data from register", data.accounts[0].providerAccountId);

    return res.redirect(302, "/checkin");
    //       // if (data.profile == "") {
    //       //   console.log("profile null");
    //       //   const timer = setTimeout(() => {
    //       //     return Router.push("register");
    //       //   }, 3000);
    //       // } else {
    //       //   const timer = setTimeout(() => {
    //       //     return Router.push("checkin");
    //       //   }, 3000);
    //       // }
    //     });
    // };
    // fetchData();

    // console.log(user);

    // let data = {
    //   to: user.accounts.providerAccountId,
    //   message: "",
    // };

    // const lineNoti = await fetch("api/line/pushMessage", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { body: required } = req;
//     const result = await prisma.user.findUnique({
//       where: {
//         email: required["Email"],
//       },
//       select: {
//         id: true,
//         email: true,
//         image: true,
//         accounts: {
//           select: {
//             access_token: true,
//             providerAccountId: true,
//           },
//         },
//         profile: {
//           select: {
//             birthday: true,
//             phone: true,
//             firstname: true,
//             lastname: true,
//             sex: true,
//           },
//         },
//       },
//     });

//     return res.status(200).json(result);
//   } catch (error) {
//     return res.status(500).json({ message: error });
//   }
// };
