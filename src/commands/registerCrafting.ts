import {
	craft,
	Crafting,
	getCraftingByOutput,
	registerCrafting,
} from "../systems/crafting";
import { Command } from "../commandHandler";
import {
	formatItemStack,
	formatItemStacks,
	ItemStack,
} from "../systems/inventory";

const command: Command = {
	aliases: ["registerCrafting", "registrarCrafting"],
	async execute({ msg, args }) {
		if (!msg.member?.permissions.has("ADMINISTRATOR"))
			msg.reply("Depois vai ser só pra admins ent aproveite :thumbs_up:");
		// return msg.reply("Só pra admins, bruh");

		if (args.length < 2)
			return msg.reply(
				"tu precisa ter pelo menos um input e um output né carai"
			);

		let input = args.slice(0, -1);
		let output = args[args.length - 1];

		let crafting = Crafting(
			input.map((itemID) => ({ amount: 1, itemID })),
			[ItemStack(output, 1)]
		);

		await registerCrafting(crafting);

		msg.reply(
			`O crafting: ${formatItemStacks(crafting.input)} -> ${formatItemStack(
				crafting.output[0]
			)} foi registrado`
		);
	},
};

export default command;
