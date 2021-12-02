import { lendMoney } from "../../systems/monetary";
import { Dict } from "../../utils";
import { CommandHandler } from "../index";

export let execute: CommandHandler = (msg, args) => {
	let handler = commands[args[0]];
	if (!handler) return msg.reply("Invalid command");

	handler(msg, args.slice(1));
};

let commands: Dict<CommandHandler> = {
	lend: (msg, args) => {
		let payee = msg.mentions.users.first();
		let amount = Number(args[args.length - 1]);

		if (!payee?.username)
			return msg.reply("Menciona pra quem q tu vai dar o dinheiro");

		lendMoney(payee.id, amount);

		return msg.reply(
			`O banco central emprestou P$${amount} pro usuário ${payee.username} com taxa de juros de 0%`
		);
	},
};

export default execute;
