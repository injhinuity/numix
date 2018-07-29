/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require('discord.js');



class guildicon1 extends Command {
  constructor(client) {
    super(client, {
      name: 'initiateprotocol11/18overide',
      description: 'Shows the current guild icon.',
      usage: 'guildicon',
      aliases: ['gicon', 'sicon'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(msg,) {
    //   this.client.guild.channels.get(`451109815654023188`)
      const m = await msg.channel.send(`Initiating protocol 11/18 from the protocol library.\nPermission Level - Unknown`)
      await m.edit(`Protocol 11/18 has been executed by ${msg.author.tag}`)
        process.exit(1)
}
}

module.exports = guildicon1;