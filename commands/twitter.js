const Command = require('../util/Command.js');
const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
const getTwitterInfo = require('get-twitter-info');
// const tokens = require('twitter-tokens');
const Twitter = require('twitter');
const media = require('twitter-profile-media');
const stats = require('tweets-stats');
// const getTweets = require('get-tweets');
const lastTweet = require('last-tweet')
const twifo = require('twifo');


const tokens = {
    consumer_key:        "iydK8U1FMZZnFY9fPU4wndhwZ",
    consumer_secret:     "WROvNpNcHKLQGD249FFmyHsRTtmJEA9hmQ7uFF4MTSTBgcHfQa",
    access_token:        "778749440920133632-Z19O3ZOAcz9xi8pDDnUqDYmHMvWDPsE",
    access_token_key:    "778749440920133632-Z19O3ZOAcz9xi8pDDnUqDYmHMvWDPsE",
    access_token_secret: "J3tjHmg2p1Ken0uK2ZKHVA1tZcCQEAMKXY33tTY2Qa5QJ"
  }
  

class twittersearch extends Command {
  constructor(client) {
    super(client, {
      name: 'twitter',
      description: 'twitter <search>',
      usage: 'twitter <search>',
      aliases: ['twit'],
      cooldown: 5,
      category: 'General',

    });
  }

  async run(message, args) { 
    if (!args[0]) return message.channel.send(`Incorrect usage, please provide a username to search.`)
    const progress = new Discord.MessageEmbed()
    .setColor('36393e')
    .setImage("https://cdn.discordapp.com/attachments/467425900947046411/468274379080466482/ezgif.com-gif-maker_6.gif")
    let msg = await message.channel.send(progress)
   let lastweet1 =  await lastTweet(args.join(' '))
    // console.log(lastweet1)
    media(tokens, `${args[0]}`).then(({ image, banner }) => {
        image;  // https://pbs.twimg.com/profile_images/615680132565504000/EIpgSD2K.png
        banner; // https://pbs.twimg.com/profile_banners/783214/1436401887
        // console.log(image)
    getTwitterInfo(tokens, `${args[0]}`).then(info => {
        // console.log(info);
        const client = new Twitter(tokens);
client.get('/statuses/user_timeline.json', { screen_name: `${args[0]}` }, (err, tweets, raw) => {
  if (err) throw err;
  stats(tweets); 
  twifo(`${args[0]}`).then(user => {
    // console.log(user);
  // console.log(tweets)
      const twitterembed = new Discord.MessageEmbed()
      .setTitle(`${info.name}`)
      .setColor('36393e')
      .setURL(`https://twitter.com/${args.join(' ')}`)
      .setDescription(info.description)
      .setThumbnail(image)
      .addField(`Followers`,`${user.followers}`,true)
      .addField(`Following`,`${user.following}`,true)
      .addField(`Tweets`,user.tweets,true)
      .addField(`Retweets`,`${info.status.retweet_count}`,true)
      .addField(`Joined`,`${user.joined}`,true)
      .addField(`Likes`,`${user.likes}`,true)
      .addField(`Pinned Tweet`,`${lastweet1.tweet}`,true)
      .setFooter(`Twitter Search`,`https://i.gifer.com/XHGv.gif`)
      .setTimestamp(new Date())
      message.channel.send(twitterembed).catch(err => console.log(err, 'error'));
      msg.delete();
    });
});
  });
});
  }
}

module.exports = twittersearch;