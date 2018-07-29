/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");


class Avatar extends Command {
  constructor(client) {
    super(client, {
      name: 'avatar',
      description: 'Shows the current avatar.',
      usage: 'avatar <user>',
      aliases: ['pfp', 'av'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(msg, mem, args) {
    //   if (!args) return msg.channel.send(`Incorrect usage, please use n1av <mentioned user>`)
    if (!msg.mentions.users.size) {
      let status1 = msg.author.presence.status;
      switch (status1) {
          case "online":
              status1 = "<a:online:466081164906594304>";
              break;
          case "dnd":
              status1 = "<a:dnd:466243707956363284>";
              break;
          case "idle":
              status1 = "<a:idle:466243711437897749>";
              break;
          case "offline":
              status1 = "<a:invisible:466243711534104577>";
              break;
      }
      const authorImg2 = new Discord.MessageEmbed()
      .setColor('36393e')
    .setTitle(`${status1}${msg.author.tag}'s Avatar`)
    .setDescription(`Name: \`\`${msg.author.username}\`\`\nID: \`\`${msg.author.id}\`\`\nCreated: \`\`${moment.utc(msg.author.createdAt).format("MMMM Do YYYY")}\`\``)
    .setThumbnail(msg.author.displayAvatarURL({ size: 2048 }))
    .setURL(msg.author.displayAvatarURL({ size: 2048 }))
        const authorImg = new Discord.MessageEmbed()
            .setColor('36393e')
          .setTitle(`${status1}${msg.author.tag}'s Avatar`)
          // .setDescription(`Name: \`\`${msg.author.username}\`\`\nID: \`\`${msg.author.id}\`\`\nCreated: \`\`${moment.utc(msg.author.createdAt).format("MMMM Do YYYY")}\`\``)
          .setImage(msg.author.displayAvatarURL({ size: 2048 }))
          // .setThumbnail(msg.author.displayAvatarURL({ size: 2048 }))
          .setURL(msg.author.displayAvatarURL({ size: 2048 }))
        const m = await msg.channel.send(authorImg).catch(console.error);
        m.react('466320932479303680').then( r => {
          m.react('466320932617584643')
          let page = 1;
            const backwardsFilter = (reaction, user) => reaction.emoji.id === '466320932479303680' && user.id === msg.author.id;
      const forwardsFilter = (reaction, user) => reaction.emoji.id === '466320932617584643' && user.id === msg.author.id;
      const backwards = m.createReactionCollector(backwardsFilter, { time: 60000 });
      const forwards = m.createReactionCollector(forwardsFilter, { time: 60000 });
      backwards.on('collect', r => { 
        if (page === 1) return; 
        page--; 

        m.edit(authorImg) 
      })

      forwards.on('collect', r => { 
        page++;
 

        m.edit(authorImg2) 
      })
    })
      } else {
        let status2 = msg.mentions.members.first().user.presence.status;
        switch (status2) {
            case "online":
                status2 = "<a:online:466081164906594304>";
                break;
            case "dnd":
                status2 = "<a:dnd:466243707956363284>";
                break;
            case "idle":
                status2 = "<a:idle:466243711437897749>";
                break;
            case "offline":
                status2 = "<a:invisible:466243711534104577>";
                break;
        }
        const memImg = new Discord.MessageEmbed()
        .setColor('36393e')
          .setTitle(`${status2}${msg.mentions.members.first().user.tag}'s Avatar`)
          .setDescription(`Name: \`\`${msg.mentions.members.first().user.username}\`\`\nID: \`\`${msg.mentions.members.first().user.id}\`\`\nCreated: \`\`${moment.utc(msg.mentions.members.first().user.createdAt).format("MMMM Do YYYY")}\`\``)
          .setImage(msg.mentions.users.first().displayAvatarURL({ size: 2048 }))
          .setThumbnail(msg.mentions.users.first().displayAvatarURL({ size: 2048 }))
          .setURL(msg.mentions.users.first().displayAvatarURL())
        return msg.channel.send(memImg).catch(console.error);
  }
}
};

module.exports = Avatar;