/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const { masterServer, requestChannel } = require('../config.json');
const Discord = require('discord.js');
function checkDays(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " day" : " days") + " ago";
};

class Request extends Command {
  constructor(client) {
    super(client, {
      name: 'request',
      description: '',
      usage: 'request',
      aliases: ['req', 'requ'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(msg, args) {
    try {
        if (!masterServer || !requestChannel) return;
        const embed = new Discord.MessageEmbed()
          .setColor('#ff003c')
          .setAuthor(`${msg.member.user.tag} / ${msg.member.user.id}`, msg.member.user.displayAvatarURL())
          .setThumbnail(msg.member.user.displayAvatarURL())
          .addField('Guild', `${msg.guild.name} [${msg.guild.memberCount}] / ${msg.guild.id}`)
          .addField('Request', args.join(' '))
          .setTimestamp();
          this.client.channels.get(`${requestChannel}`).send(embed)
        return msg.channel.send('Request has been send!');
      } catch (err) { console.log(err); }
  }
  }


module.exports = Request;