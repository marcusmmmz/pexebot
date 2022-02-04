import { lendMoney } from "../systems/monetary";
import { Command } from "../commandHandler";

let command: Command = {
	aliases: ["centralBankLend", "meEmpresta"],
	async execute({ msg, args }) {
		if (!msg.member?.permissions.has("ADMINISTRATOR"))
			return msg.reply("Só pra admins, bruh");

		let payee = msg.mentions.users.first() ?? msg.author;
		let amount = Number(args[args.length - 1]);

		if (!payee?.username)
			return msg.reply("Menciona pra quem q tu vai dar o dinheiro");

		await lendMoney(payee.id, amount);

		return msg.reply(
			`O banco central emprestou P$${amount} pro usuário ${payee.username} com taxa de juros de 0%`
		);
	},
};

export default command;
