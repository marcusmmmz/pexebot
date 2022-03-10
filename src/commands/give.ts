import { Command } from "../commandHandler";
import {
	formatItemStack,
	giveItem,
	hasItem,
	removeItemById,
} from "../systems/inventory";

const command: Command = {
	aliases: ["give"],
	async execute({ msg, args }) {
		let sender = msg.author;
		let receiver = msg.mentions.users.first() ?? msg.author;
		let itemID = args[1];
		let amount = Number(args[args.length - 1]);

		let itemStack = {
			itemID,
			amount,
		};

		if (!hasItem(itemStack.itemID, itemStack.amount, sender.id))
			return msg.reply("Tu não tem itens o suficiente pra mandar porrar");

		removeItemById(itemStack, sender.id);
		giveItem(itemStack, receiver.id);

		msg.reply(
			`O usuário ${receiver.username} ganhou ${formatItemStack(itemStack)}`
		);
	},
};

export default command;
