const Command = require('../util/Command.js');
const Discord = require('discord.js');
class speedtest extends Command {
	constructor(client) {
		super(client, {
			name: 'speed',
			description: 'discord',
			usage: 'discord',
			aliases: ['net'],
			cooldown: 5,
			category: 'System',
		});
	}
	async run(message) {
		message.channel.send(`Perhaps fuck off!`)
	}
}
module.exports = speedtest;