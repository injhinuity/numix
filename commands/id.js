/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require('discord.js');
const sm = require("string-similarity");


class id extends Command {
  constructor(client) {
    super(client, {
      name: 'id',
      description: 'Returns ID.',
      usage: '<guild|member|role|channel> [member:member] [channel:channel] [args:str]',
      aliases: ['gicon', 'sicon'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(msg, [type,...args]) {
    var ichannel;
    if (msg.mentions.channels.first() !== undefined) {
      ichannel = msg.mentions.channels.first();
    } else {
      ichannel = msg.channel;
    }
    args = args.length > 0 ? args.join(' ') : null;
    let members = [];
    let indexes = [];
    msg.guild.members.forEach(function(member) {
        members.push(member.user.username);
        indexes.push(member.id);
    })
    let match = sm.findBestMatch(args, members);
    let username = match.bestMatch.target;
    let user = msg.mentions.users.first();
    const member = msg.mentions.members.first() || msg.guild.members.get(args) || msg.guild.members.get(indexes[members.indexOf(username)]);

    switch (type) {
    case 'guild':
    const guildid = new Discord.MessageEmbed()
    .setFooter(`${msg.guild.name} / ${msg.guild.id}`,msg.guild.iconURL())
    .setColor('36393e')
      return msg.channel.send(guildid);
    case 'member':
    const memberid = new Discord.MessageEmbed()
    .setFooter(`${member.user.tag} / ${member.user.id}`,member.user.displayAvatarURL())
    .setColor('36393e')
      if (member) return msg.channel.send(memberid);
      break;
    case 'channel':
    const channelid = new Discord.MessageEmbed()
    .setFooter(`${ichannel.name} / ${ichannel.id}`,'https://cdn.discordapp.com/emojis/449278397173071877.png?v=1')
    .setColor('36393e')
      return msg.channel.send(channelid);
    default:
    const errorid = new Discord.MessageEmbed()
    .setTitle(`Error`)
    .setDescription(`I cannot find the ID of \`${args}\``)
    .setColor('36393e')
      return msg.channel.send(errorid);
    }
  }
};
module.exports = id;