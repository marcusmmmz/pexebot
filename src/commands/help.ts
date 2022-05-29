import { Command, commandDict, commandList } from "../commandHandler";

const command: Command = {
	aliases: ["help", "ajuda"],
	async execute({ msg, args }) {
		let commandName = args[0];

		if (commandName) {
			let command = commandDict[commandName];

			if (!command) return msg.reply(`Esse comando não existe!`);

			msg.reply(formatCommand(command));
		} else {
			msg.reply("comandos: \n" + formatCommands(commandList));
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
