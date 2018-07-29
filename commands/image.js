/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require('discord.js');
const IMAGE_NAME = /\.(jpe?g|png|gif|webp)$/i;



class guildicon extends Command {
  constructor(client) {
    super(client, {
      name: 'img',
      description: 'Shows the current guild icon.',
      usage: 'guildicon',
      aliases: ['gicon', 'sicon'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(msg, args) {
    if (args.length < 1) {
        throw 'Please provide an image URL to send.';
    }

    msg.delete();

    const url = args[0];
    let name;

    if (!IMAGE_NAME.test(url)) {

        name = 'image.png';
    }

    try {
      const embed = new Discord.MessageEmbed()
      .setImage(url)
      .setTitle("Image Link")
      .setURL(url)
      .setColor('36393e')
      .setFooter(`Uploaded By: ${msg.author.username}`, `${msg.author.avatarURL}`)
      .setTimestamp()
        await msg.channel.send(embed)

    } catch (error) {
        msg.channel.send(`Sorry i have failed you.`);
      }
}
}

module.exports = guildicon;