import {
	CENTRAL_BANK_ACCOUNT,
	getUserMonetaryInfo,
	lendMoney,
	printMoney,
} from "../../systems/monetary";
import { Dict } from "../../utils";
import { CommandHandler } from "../index";

export let execute: CommandHandler = (msg, args) => {
	let handler = commands[args[0]];
	if (!handler) return msg.reply("Invalid command");

	handler(msg, args.slice(1));
};

let commands: Dict<CommandHandler> = {
	print: (msg, args) => {
		if (msg.author.id !== msg.guild?.ownerId)
			return msg.reply("Você não é gerente do banco central porrar");

		let amount = Number(args[args.length - 1]);
		printMoney(amount);
		msg.reply(`R$${amount} foram imprimidos`);
	},
	balance: (msg) => {
		let { balance } = getUserMonetaryInfo(CENTRAL_BANK_ACCOUNT);
		msg.reply(`O banco central tem R$${balance}`);
	},
	lend: (msg, args) => {
		let payee = msg.mentions.users.first();
		let amount = Number(args[args.length - 1]);

		if (!payee?.username)
			return msg.reply("Menciona pra quem q tu vai dar o dinheiro");

		lendMoney(payee.id, amount);

		return msg.reply(
			`O banco central emprestou ${amount} pro usuário ${payee.username} com taxa de juros de 0%`
		);
	},
};

export default execute;
