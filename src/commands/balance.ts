import { getUserMonetaryInfo } from "../systems/monetary";
import { Command } from "../commandHandler";

const command: Command = {
	aliases: ["balance", "saldo"],
	execute({ msg }) {
		let user = msg.mentions.users.first() ?? msg.author;

		let { balance } = getUserMonetaryInfo(user.id);

		msg.reply(`usuário ${user.username} tem P$${balance} na conta`);
	},
};

export default command;
