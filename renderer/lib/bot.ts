import { Telegraf } from "telegraf"

export const bot = new Telegraf(localStorage.getItem("botToken"))
