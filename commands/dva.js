/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require("discord.js");
const snek = require("snekfetch");



class dvaa extends Command {
  constructor(client) {
    super(client, {
      name: 'dva',
      description: 'Shows the current guild icon.',
      usage: 'guildicon',
      aliases: ['gicon', 'sicon'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(message, mem,) {
    snek.get('https://api.computerfreaker.cf/v1/dva')
            .then((res) => {
    // console.log(res.body)
    let hentaiEmbed = new Discord.MessageEmbed()
    .setColor('36393e')
    .setImage(res.body.url)
    // .setFooter(`Requested By: ${message.author.username}`, `${message.author.avatarURL}`)

    message.channel.send(hentaiEmbed);
})
  }
}

module.exports = dvaa;