import { config } from "dotenv";

config({
	path: "../.env",
});

export const token = process.env.DISCORD_BOT_TOKEN;
export const prefix = process.env.DISCORD_BOT_PREFIX ?? "pexe ";
