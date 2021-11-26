import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { channelId, title, members } = req.body
  const result = await prisma.channel.create({
    data: {
      channelId: String(channelId),
      members,
      title,
      settings: {},
    },
  })
  res.json(result)
}
