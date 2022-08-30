import { readdir } from "fs/promises";
import { Message } from "discord.js";
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

const commandsDirPath = "./commands";

export default function handleCommand(msg: Message) {
	let split = msg.content.slice(prefix.length).split(" ");
	let commandName = split[0];
	let handler = commandMap.get(commandName)?.execute;

	if (!handler) return msg.reply("Invalid command");

	handler({
		msg,
		args: split.slice(1),
	});
}

export async function setupCommands() {
	console.log("Setting up commands");

	let commandFiles = await readdir(commandsDirPath);

	await Promise.all(
		commandFiles.map(async (commandName) => {
			let command: Command = (await import(`${commandsDirPath}/` + commandName))
				.default;

			if (command.aliases.some((alias) => commandMap.has(alias)))
				throw new Error(`${commandName} has a conflicting alias.`);

			for (const alias of command.aliases) {
				commandMap.set(alias, command);
			}

			commandSet.add(command);
		})
	);

	console.log("Commands setup done");
}

export let commandMap = new Map<string, Command>();
export let commandSet = new Set<Command>();
