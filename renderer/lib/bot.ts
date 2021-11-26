import { Telegraf } from "telegraf"

let bot
if (process.browser) {
  bot = new Telegraf(localStorage.getItem("botToken"))
}

export { bot }
