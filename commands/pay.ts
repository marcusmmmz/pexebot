import { payUser, TransactionError } from "../systems/monetary";
import { CommandHandler } from "./index";

export let execute: CommandHandler = (msg, args) => {
	let payer = msg.author;
	let payee = msg.mentions.users.first();
	let amount = Number(args[args.length - 1]);

	if (!payee?.username)
		return msg.reply("Menciona pra quem q tu vai dar o dinheiro");

	try {
		payUser(payer.id, payee.id, amount);
	} catch (err) {
		if (err instanceof TransactionError) {
			switch (err.type) {
				case "INSUFFICIENT_FUNDS":
					return msg.reply("Tu não tem tanto dinheiro assim porrar");
				case "INVALID_AMOUNT":
					return msg.reply("Tá tentando roubar porrar?");
				case "SAME_PAYER_AND_PAYEE":
					return msg.reply(
						"Você passou o dinheiro da sua mão esquerda para sua mão direita"
					);
				default:
					throw err;
			}
		} else throw err;
	}

	msg.reply(`${payer.username} paid ${payee.username} P$${amount}`);
};

export default execute;
