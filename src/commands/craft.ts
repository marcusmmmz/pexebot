import { craft, CraftErrors, getCraftingByOutput } from "../systems/crafting";
import { Command } from "../commandHandler";
import { formatItemStacks } from "../systems/inventory";

const command: Command = {
	aliases: ["craft", "craftar"],
	async execute({ msg, args }) {
		let itemId = args[0];
		let crafting = await getCraftingByOutput(itemId);

		if (!crafting) return msg.reply("Esse item nem existe bruh");

		const { err, res } = await craft(msg.author.id, crafting);

		switch (err) {
			case CraftErrors.USER_CANT_CRAFT:
				return msg.reply("Tu não tem recursos pra fazer isso porrar");
		}

		msg.reply(`Tu craftou: ${formatItemStacks(res)}`);
	},
};

export default command;
