const snek = require('snekfetch');
const Social = require('../util/Command.js');
const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');


class Reddit extends Social {
  constructor(client) {
    super(client, {
      name: 'reddit',
      description: 'Posts a random subreddit entry.',
      usage: 'reddit [flag:-new|-random|-hot|-top] [subreddit:subreddit]',
      category: 'Fun',
      botPerms: ['SEND_MESSAGES'],
      cooldown: 30
    });
  }

  async run(message, args, level) {
    const subreddit = args.join(' ') || 'random';
    const subRedCat = message.flags[0] || 'random';
    try {
      const { body } = await snek.get(`https://www.reddit.com/r/${subreddit}/${subRedCat}.json`);
      let meme;
      if (subRedCat === 'random' || !message.flags[0]) meme = body[0].data.children[Math.floor(Math.random() * body[0].data.children.length)].data;
      else meme = body.data.children[Math.floor(Math.random() * body.data.children.length)].data;
    console.log(meme)
      if (!message.channel.nsfw && meme.over_18) {
        throw 'Cannot display NSFW content in a SFW channel.';
      }
      const msg = await message.channel.send(`'Retriving data from ${meme.subreddit_name_prefixed}...'`);
      const duration = moment.duration(meme.created_utc).format(' D [days], H [hrs], m [mins], s [secs]');
      let redditembed = new Discord.MessageEmbed()
      .setColor('36393e')
      .setDescription(`[${meme.title}](${meme.url})\n${meme.selftext}`)
      .addField(`Upvote Ratio`,`${meme.upvote_ratio}`,true)
      .addField(`Author`,`${meme.author}`,true)
      .addField(`Comments`,`${meme.num_comments.toLocaleString()}`,true)
      .addField(`Subreddit Subscribers`,`${meme.subreddit_subscribers.toLocaleString()}`,true)
      .addField(`Created At`,`${duration}`)
      .setFooter(`${meme.subreddit_name_prefixed}`,`https://i.gifer.com/4EfW.gif`)
      .setTimestamp(new Date())
      await message.channel.send(redditembed);
      msg.delete();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Reddit;