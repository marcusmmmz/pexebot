import { formatItemStack, getInventory } from "../systems/inventory";
import { Command } from "../commandHandler";

const command: Command = {
	aliases: ["inventory", "inventário"],
	async execute({ msg }) {
		let user = msg.mentions.users.first() ?? msg.author;

		let slots = getInventory(user.id);

		let formattedItems = slots.map(formatItemStack).join(", ");

		if (slots.length == 0) formattedItems = "Nenhum";

		msg.reply(
			`Items no inventário do usuário ${user.username}: ${formattedItems}`
		);
	},
};

export default command;
