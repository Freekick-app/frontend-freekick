/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import AeonPayService from "@/lib/aeon";

type Payload = {
  userId: string;
  amount: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const { userId, amount } = JSON.parse(req.body) as Payload;
    const order = await AeonPayService.createOrder(userId, amount?.toString());
    // console.log(order, "AeonPayService.createOrder response");
    res.status(200).json(order);
  } else {
    res.status(405).end();
  }
}
