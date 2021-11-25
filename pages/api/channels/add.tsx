import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { channel_Id } = req.body
  const result = await prisma.channel.create({
    data: {
      channel_Id: channel_Id,
    },
  })
  res.json(result)
}
