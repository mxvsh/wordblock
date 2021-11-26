import { NextApiRequest, NextApiResponse } from "next"
import { bot } from "../../../lib/bot"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  try {
    const info = await bot.telegram.getChat(Number(id))
    res.status(200).json(info)
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
}
