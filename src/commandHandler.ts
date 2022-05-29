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

const commandsDirPath = "./commands";

export default function handleCommand(msg: Message) {
	let split = msg.content.slice(prefix.length).split(" ");
	let commandName = split[0];
	let handler = commandDict[commandName]?.execute;

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

			if (command.aliases.some((alias) => commandDict[alias]))
				throw new Error(`${commandName} has a conflicting alias.`);

			command.aliases.forEach((alias) => (commandDict[alias] = command));

			commandList.push(command);
		})
	);

	console.log("Commands setup done");
}

export let commandDict: Dict<Command> = {};
export let commandList: Command[] = [];
