/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require("discord.js");
const snek = require("snekfetch");
const client = require('nekos.life');
const neko = new client();


class nekofoxgirl extends Command {
  constructor(client) {
    super(client, {
      name: 'foxgirl',
      description: 'Shows the current guild icon.',
      usage: 'guildicon',
      aliases: ['gicon', 'sicon'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(message, mem,) {
    // console.log(await neko.getSFWHug());
let img = await neko.getSFWFoxGirl();
    let hentaiEmbed = new Discord.MessageEmbed()
    .setColor('36393e')
    .setImage(img.url)
    message.channel.send(hentaiEmbed);
  }
}

module.exports = nekofoxgirl;