/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require('discord.js');
const db = require('quick.db');



class guildicon extends Command {
  constructor(client) {
    super(client, {
      name: 'setcolor',
      description: 'Shows the current guild icon.',
      usage: 'guildicon',
      aliases: ['gicon', 'sicon'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(msg, args) {
    if (!args[0]) return msg.channel.send(`Please choose one of the color from the list below.\n1: red\n2: blue\n3: purple\n4: cyan`)
    db.set(`color_${msg.author.id}`, args[0])
    .then(i => {
    let sEmbed = new Discord.MessageEmbed()
        .setColor('36393e')
        .setDescription(`Done`);
    msg.channel.send(sEmbed);
})
}
}

module.exports = guildicon;