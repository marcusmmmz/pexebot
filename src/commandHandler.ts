import { readdir } from "fs/promises";
import { Message } from "discord.js";
import { Dict } from "./utils";
import { prefix } from "./env";

export interface CommandContext {
	msg: Message;
	args: string[];
}

export type CommandHandler = (context: CommandContext) => any;

export interface Command {
	aliases: string[];
	execute: CommandHandler;
}

export default function handleCommand(msg: Message) {
	let split = msg.content.slice(prefix.length).split(" ");
	let commandName = split[0];
	let handler = commandHandlers[commandName];

	if (!handler) return msg.reply("Invalid command");

	handler({
		msg,
		args: split.slice(1),
	});
}

export async function setupCommands() {
	console.log("Setting up commands");

	// -3 is for removing the ".ts" or ".js" file extension
	let commandNames = (await readdir("./commands")).map((v) => v.slice(0, -3));
	let commands = await Promise.all(
		commandNames.map(
			async (commandName) =>
				(
					await import("./commands/" + commandName)
				).default as Command
		)
	);
	for (const command of commands) {
		command.aliases.forEach(
			(alias) => (commandHandlers[alias] = command.execute)
		);
		// for (const alias of command.aliases) {
		// 	commandHandlers[alias] = command.execute;
		// }
	}

	console.log("Commands setup done");
}

let commandHandlers: Dict<CommandHandler> = {};
