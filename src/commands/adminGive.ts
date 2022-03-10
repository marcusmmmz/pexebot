import { Command } from "../commandHandler";
import {
	formatItemStack,
	giveItem,
	removeItemById,
} from "../systems/inventory";

const command: Command = {
	aliases: ["adminGive"],
	async execute({ msg, args }) {
		if (!msg.member?.permissions.has("ADMINISTRATOR"))
			return msg.reply("Só pra admins, bruh");

		let user = msg.mentions.users.first() ?? msg.author;
		let itemID = args[1];
		let amount = Number(args[args.length - 1]);

		let itemStack = {
			itemID,
			amount,
		};

		removeItemById;
		giveItem(itemStack, user.id);

		msg.reply(
			`O usuário ${user.username} ganhou ${formatItemStack(itemStack)}`
		);
	},
};

export default command;
