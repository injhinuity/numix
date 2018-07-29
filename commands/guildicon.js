/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");


class guildicon extends Command {
  constructor(client) {
    super(client, {
      name: 'guildicon',
      description: 'Shows the current guild icon.',
      usage: 'guildicon',
      aliases: ['gicon', 'sicon'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(msg, mem,) {
    //   if (!args) return msg.channel.send(`Incorrect usage, please use n1av <mentioned user>`)
        const authorImg = new Discord.MessageEmbed()
            .setColor('36393e')
          .setTitle(`${msg.guild.name}'s Icon`)
          .setDescription(`Name: \`\`${msg.guild.name}\`\`\nID: \`\`${msg.guild.id}\`\`\nCreated: \`\`${moment.utc(msg.guild.createdAt).format("MMMM Do YYYY")}\`\``)
          .setImage(msg.guild.iconURL({ size: 2048 }))
          .setThumbnail(msg.guild.iconURL())
          .setURL(msg.guild.iconURL({ size: 2048 }))
        return msg.channel.send(authorImg).catch(console.error);
}
}

module.exports = guildicon;