import { transactionErrors, payUser } from "../systems/monetary";
import { CommandHandler } from "./index";

export let execute: CommandHandler = (msg, args) => {
	let payer = msg.author;
	let payee = msg.mentions.users.first();
	let amount = Number(args[args.length - 1]);

	if (!payee?.username)
		return msg.reply("Menciona pra quem q tu vai dar o dinheiro");

	const { error } = payUser(payer.id, payee.id, amount);
	if (error !== null) {
		if (error == transactionErrors.INSUFFICIENT_FUNDS)
			return msg.reply("Tu não nem tanto dinheiro assim porrar");
		if (error == transactionErrors.INVALID_AMOUNT)
			return msg.reply("Tá tentando roubar porrar?");
		if (error == transactionErrors.SAME_PAYER_AND_PAYEE)
			return msg.reply(
				"Você passou o dinheiro da sua mão esquerda para sua mão direita"
			);
		return msg.reply("unhandled error");
	}

	msg.reply(`${payer.username} paid ${payee.username} R$${amount}`);
};

export default execute;
