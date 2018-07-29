/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require("discord.js");
const snek = require("snekfetch");
const client = require('nekos.life');
const neko = new client();


class nekokiss extends Command {
  constructor(client) {
    super(client, {
      name: 'kiss',
      description: 'Shows the current guild icon.',
      usage: 'guildicon',
      aliases: ['gicon', 'sicon'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(message, mem,) {
    // console.log(await neko.getSFWHug());
let img = await neko.getSFWKiss();
if (!message.mentions.users.size) {
    let hugEmbed = new Discord.MessageEmbed()
    .setColor('36393e')
    .setFooter(`I will kiss you anytime! ><"`)
    .setImage(img.url)
    message.channel.send(hugEmbed)
    } else {
        let hentaiEmbed = new Discord.MessageEmbed()
        .setColor('36393e')
        .setFooter(`${message.author.username} kissed ${message.mentions.members.first().user.username}`)
        .setImage(img.url)
        message.channel.send(hentaiEmbed);
    }
  }
}

module.exports = nekokiss;