/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require('discord.js');
var MovieInfo = require('movieinfo');
var mi = new MovieInfo('ofdb');



class guildicon extends Command {
  constructor(client) {
    super(client, {
      name: 'movie',
      description: 'Shows the current guild icon.',
      usage: 'guildicon',
      aliases: ['gicon', 'sicon'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(msg, args) {
    //   if(!args.join(' ')) return msg.channel.send('Give me something to search you pleb.')
    //   let ani2 = new Discord.MessageEmbed()
    //   .setDescription('<a:search:472505065245114368> Searching...')
    //   .setColor('36393e')
    //   const m = await msg.channel.send(ani2)
      mi.searchInfo('Resident Evil Apocalypse', function (err, movie) {
        console.log(movie);
        // let movieem = new Discord.MessageEmbed()
        // .setThumbnail(`https://www.movieline.tv/wp-content/uploads/2017/12${res.poster_path}`)
        // .setDescription(res.overview)
        // m.edit(movieem)
    });
  }
}

module.exports = guildicon;