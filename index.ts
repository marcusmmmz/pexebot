import { token } from "./config.json";
import handleMessageCreate from "./commands/index";
import { Client, Intents } from "discord.js";

let client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once("ready", () => {
	console.log("Pexebot online");
});

client.on("messageCreate", handleMessageCreate);

client.login(token);
