import { getUserMonetaryInfo } from "../systems/monetary";
import { Command } from "../commandHandler";

const command: Command = {
	aliases: ["balance", "saldo"],
	async execute({ msg }) {
		let user = msg.mentions.users.first() ?? msg.author;

		let { balance } = await getUserMonetaryInfo(user.id);

		msg.reply(`O usuário ${user.username} tem P$${balance} na conta`);
	},
};

export default command;
