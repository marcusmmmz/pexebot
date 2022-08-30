import { Command, commandMap, commandSet } from "../commandHandler";

const command: Command = {
	aliases: ["help", "ajuda"],
	async execute({ msg, args }) {
		let commandName = args[0];

		if (commandName) {
			let command = commandMap.get(commandName);

			if (!command) return msg.reply(`Esse comando não existe!`);

			msg.reply(formatCommand(command));
		} else {
			msg.reply("comandos: \n" + formatCommands(Array.from(commandSet)));
		}
	},
};

function formatCommands(commands: Command[]) {
	return commands.map(formatCommand).join("\n");
}

function formatCommand(command: Command) {
	return command.aliases.join(", ");
}

export default command;
