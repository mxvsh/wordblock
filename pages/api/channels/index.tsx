import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const channels = await prisma.channel.findMany()
  res.json(channels)
}
