const Command = require('../util/Command.js');
const { promisify } = require('util');
const Discord = require('discord.js');
const writeFile = promisify(require('fs').writeFile);

class Reboot extends Command {
  constructor(client) {
    super(client, {
      name: 'reboot',
      description: 'Reboots the bot if running on pm2 or nodemon',
      usage: 'reboot',
      aliases: ['restart'],
      cooldown: 0,
      category: 'Owner'
    });
  }

  async run(message) {
    const rebootembed = new Discord.MessageEmbed()
    .setColor('36393e')
    .setFooter('Rebooting the bot, please wait...','https://cdn.discordapp.com/emojis/416475652922015746.gif?v=1')
    const m = await message.channel.send(rebootembed);
    await writeFile('./data/reboot.json', `{ "messageID": "${m.id}", "channelID": "${m.channel.id}" }`);
    process.exit(1);
  }
}


module.exports = Reboot;