import centralBank from "./admin/centralBank";
import pay from "./pay";
import balance from "./balance";

import { Awaitable, Message } from "discord.js";
import { Dict } from "../utils";

export type CommandHandler = (message: Message, args: string[]) => any;

const prefix = "pexe";

export default function handleMessageCreate(message: Message): Awaitable<void> {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	let split = message.content.split(" ");
	let command = split[1];
	let args = split.slice(2);

	let handler = commands[command];
	if (!handler) {
		message.reply("Invalid command");
		return;
	}

	handler(message, args);
}

let commands: Dict<CommandHandler> = {
	pay,
	balance,
	centralBank,
};
