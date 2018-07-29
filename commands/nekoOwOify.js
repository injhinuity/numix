/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require("discord.js");
const snek = require("snekfetch");
const client = require('nekos.life');
const neko = new client();


class nekoOwOify extends Command {
  constructor(client) {
    super(client, {
      name: 'owo',
      description: 'Shows the current guild icon.',
      usage: 'guildicon',
      aliases: ['gicon', 'sicon'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(message, args) {
    // console.log(await neko.getSFWHug());
    if (!args.join(' ')) return message.channel.send(`Please provide some arguments!`)
    let owo = await neko.getSFWOwOify({text: args.join(' ')});
    console.log(owo);
    let hentaiEmbed = new Discord.MessageEmbed()
    .setColor('36393e')
    .setDescription(`<a:face:471518150723108874> ${args.join(' ')}\n⠀║\n⠀╚<:yas:471518331145420800> ${owo.owo}`)
    message.channel.send(hentaiEmbed);
  }
}

module.exports = nekoOwOify;