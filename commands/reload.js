const Command = require('../util/Command.js');
const Discord = require('discord.js');

class Reload extends Command {
  constructor(client) {
    super(client, {
      name: 'reload',
      description: 'Reloads a command instead of restarting the bot',
      usage: 'r <command>',
      aliases: ['r','load'],
      cooldown: 0,
      category: 'Owner'
    });
  }

  async run(message, args) {
    const command = this.client.commands.has(args[0]) ? this.client.commands.get(args[0]) : (this.client.aliases.has(args[0]) ? this.client.aliases.get(args[0]) : null);  
    if (command) {
      try {
        await command.reload();
        let reloadembed = new Discord.MessageEmbed()
        .setFooter('Successfully reloaded: ' + args[0],'https://cdn.discordapp.com/emojis/465524630732668973.gif?v=1')
        .setColor('36393e')
        message.channel.send(reloadembed);
      } catch (e) {
        let errembed = new Discord.MessageEmbed()
        .setDescription('Error : ' + e.stack)
        .setColor('36393e')
        message.channel.send(errembed);
      }
    } else {
      let invalidembed = new Discord.MessageEmbed()
      .setFooter('Invalid command!','https://cdn.discordapp.com/emojis/465524668560834581.gif?v=1')
      .setColor('36393e')
      message.channel.send(invalidembed);
    }
  }
}


module.exports = Reload;