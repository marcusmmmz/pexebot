import { getUserMonetaryInfo } from "../systems/monetary";
import { CommandHandler } from "./index";

export let execute: CommandHandler = (msg, args) => {
	let user = msg.mentions.users.first() ?? msg.author;

	let { balance } = getUserMonetaryInfo(user.id);

	msg.reply(`usuário ${user.username} tem P$${balance} na conta`);
};

export default execute;
