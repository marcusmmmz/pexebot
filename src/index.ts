import { prefix, token } from "./env";
import handleCommand, { setupCommands } from "./commandHandler";
import { Client, Intents } from "discord.js";

function setupClient() {
	let client = new Client({
		intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
	});

	client.once("ready", () => {
		console.log("Pexebot online");
	});
	client.on("messageCreate", (message) => {
		if (message.author.bot) return;
		if (!message.content.startsWith(prefix)) return;

		handleCommand(message);
	});

	client.login(token);
}

function setup() {
	console.log("Starting setup");

	setupClient();
	setupCommands();
}

setup();
