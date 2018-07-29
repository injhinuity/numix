/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require('discord.js');
const MalApi = require('mal-api')
const malScraper = require('mal-scraper')


class guildicon extends Command {
  constructor(client) {
    super(client, {
      name: 'anime',
      description: 'Shows the current guild icon.',
      usage: 'guildicon',
      aliases: ['gicon', 'sicon'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(msg, args) {
      if(!args.join(' ')) return msg.channel.send('Give me something to search you pleb.')
      let ani2 = new Discord.MessageEmbed()
      .setDescription('<a:search:472505065245114368> Searching...')
      .setColor('36393e')
      const m = await msg.channel.send(ani2)
    const name = `${args.join(' ')}`
    let nope = "N/A";
    malScraper.getInfoFromName(name).then(data => {
        console.log(data)
    let ani = new Discord.MessageEmbed()
    .setDescription(data.synopsis)
    .setColor('36393e')
    .setTitle(data.title)
    .setURL(data.url)
    .setThumbnail(data.picture)
    .addField('Information',`Episodes - **${data.episodes}**\nAired - **${data.aired}**\nPremiered - **${data.premiered | nope}**\nStatus - **${data.status}**\nRating - **${data.rating}**\nFavorites - **${data.favorites}**`,true)
    .addField('(✿◠‿◠)',`Score - **${data.score}**\nStats - **${data.scoreStats}**\nRanked - **${data.ranked}**\nDuration - **${data.duration}**\nPopularity - **${data.popularity}**\nMembers - **${data.members}**`,true)
    .setFooter(`Ping : ${Math.round(this.client.ping)}ms | ${new Date().toLocaleString()}`,"https://i.pinimg.com/736x/e7/89/b0/e789b04df325a50280849bcfcc45d16c--anime-animals-cat-ears.jpg")
    // .addField('Episodes',data.episodes,true)
    // .addField('Status',data.status, true)
    // .addField('Aired Date', data.aired,true)
    // .addField('Premiered Date', data.premiered,true)
    // .addField('Rating',data.rating,true)
    // .addField('Score', data.score,true)
    // .addField('Score Stats', data.scoreStats,true)
    // .addField('Ranked', data.ranked,true)
    // .addField('Duration', data.duration,true)
    // .addField('Popularity', data.popularity, true)
    // .addField('Members', data.members,true)
    // .addField('Favorites', data.favorites, true)
    m.edit(ani)
    // const animeembed = new Discord.MessageEmbed()
    // .setColor('36393e')
    // // .setDescription(`${data.synopsis}`)
    // msg.channel.send(animeembed)
    // .catch((err) => console.log(err))
})
  }
}

module.exports = guildicon;