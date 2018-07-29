/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require("discord.js");
const snek = require("snekfetch");
const client = require('nekos.life');
const neko = new client();


class nekomeow extends Command {
  constructor(client) {
    super(client, {
      name: 'meow',
      description: 'Shows the current guild icon.',
      usage: 'guildicon',
      aliases: ['gicon', 'sicon'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(message, mem,) {
    // console.log(await neko.getSFWHug());
let img = await neko.getSFWMeow();
    let hentaiEmbed = new Discord.MessageEmbed()
    .setColor('36393e')
    .setImage(img.url)
    message.channel.send(hentaiEmbed);
  }
}

module.exports = nekomeow;