import { payUser, transactionErrors } from "../systems/monetary";
import { Command } from "../commandHandler";

const command: Command = {
	aliases: ["pay", "pagar"],
	execute({ msg, args }) {
		let payer = msg.author;
		let payee = msg.mentions.users.first();
		let amount = Number(args[args.length - 1]);

		if (!payee?.username)
			return msg.reply("Menciona pra quem q tu vai dar o dinheiro");

		const { error } = payUser(payer.id, payee.id, amount);

		if (error !== null)
			switch (error) {
				case transactionErrors.INSUFFICIENT_FUNDS:
					return msg.reply("Tu não tem tanto dinheiro assim porrar");
				case transactionErrors.INVALID_AMOUNT:
					return msg.reply("Tá tentando roubar porrar?");
				case transactionErrors.SAME_PAYER_AND_PAYEE:
					return msg.reply(
						"Você passou o dinheiro da sua mão esquerda para sua mão direita"
					);
				default:
					return msg.reply("Pera q teve um unhandled error");
			}

		msg.reply(`${payer.username} paid ${payee.username} P$${amount}`);
	},
};

export default command;
