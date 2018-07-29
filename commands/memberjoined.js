/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require('discord.js');
const Moment = require('moment');


class MemberJoined extends Command {
  constructor(client) {
    super(client, {
      name: 'memberjoined',
      description: '',
      usage: 'memberjoined',
      aliases: ['newmem', 'newjoin'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(msg, [dateOne, dateTwo]) {
    let start = msg.createdTimestamp;
    let end = start - (1000 * 60 * 60 * 24);
    let count = 0;
    const timer = Date.now();

    if (dateOne && !dateTwo) {
      start = msg.createdTimestamp;
      if (await new Date(dateOne !== (null || NaN))) end = await new Date(dateOne).getTime();
      switch (dateOne) {
      case 'hourly':
        end = start - (1000 * 60 * 60);
        break;
      case 'daily':
        end = start - (1000 * 60 * 60 * 24);
        break;
      case 'weekly':
        end = start - (1000 * 60 * 60 * 24 * 7);
        break;
      case 'monthly':
        end = start - (1000 * 60 * 60 * 24 * 30);
        break;
      case 'monthly29':
        end = start - (1000 * 60 * 60 * 24 * 29);
        break;
      case 'monthly30':
        end = start - (1000 * 60 * 60 * 24 * 30);
        break;
      case 'monthly31':
        end = start - (1000 * 60 * 60 * 24 * 31);
        break;
      case 'alltime':
        end = msg.guild.createdTimestamp;
        break;
      }
    } else if (dateOne && dateTwo) {
      if ((await new Date(dateOne) && await new Date(dateTwo)) !== (null || NaN)) {
        start = await new Date(dateOne).getTime();
        end = await new Date(dateTwo).getTime();
      }
    }

    if ((start || end) === (null || NaN)) return msg.reply('There was an error paring the date!');
    if (start < end) end = [start, start = end][0];
    if (end < msg.guild.createdTimestamp) end = msg.guild.createdTimestamp;

    await msg.guild.members.array().forEach(m => {
      if (m.joinedTimestamp <= start && m.joinedTimestamp >= end) count++;
    });

    const avatar = msg.guild.iconURL() ? msg.guild.iconURL() : 'https://imgur.com/ik9S8V5.png';
    const embed = new Discord.MessageEmbed()
      .setColor('36393e')
      .setTitle('Members Joined')
      .setThumbnail(avatar)
      .setAuthor(`${msg.guild.name} / ${msg.guild.id}`, avatar)
      .addField('Time Frame', `${Moment.utc(end).format('llll')} UTC-0 - ${Moment.utc(start).format('llll')} UTC-0`)
      .addField('Members Joined', count,true)
    //   .addField('Total Processing Time', `${(msg.createdTimestamp - timer) / 1000}s`, true)
    //   .addField('Client-Server Ping', `${Math.round(msg.client.ping)}ms`, true)
      .setTimestamp(new Date());
    return msg.channel.send({ embed }).catch(err => console.log(err, 'error'));
  }
  }


module.exports = MemberJoined;