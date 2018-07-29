const Command = require('../util/Command.js');
const Discord = require('discord.js');
var snekfetch = require('snekfetch');
const dateFormat = require('dateformat');



class speedtest extends Command {
  constructor(client) {
    super(client, {
      name: 'discord',
      description: 'discord',
      usage: 'discord',
      aliases: ['net'],
      cooldown: 5,
      category: 'System',

    });
  }

  async run(message) { 
    snekfetch.get('https://srhpyqt94yxb.statuspage.io/api/v2/status.json').then(res => {
      // console.log(res.body);
      // console.log(res.body.page.id);
      // console.log(res.body.page.name);
      // console.log(res.body.page.url);
      // console.log(res.body.page.time_zone);
      // console.log(res.body.page.updated_at);
      // console.log(res.body.status.indicator);
      // console.log(res.body.status.description);
      var now = new Date(`${res.body.page.updated_at}`);
      let stats = res.body.status.indicator;
      switch (stats) {
          case "none":
              stats = "https://cdn.discordapp.com/attachments/463776616779087884/471538150305431563/100.png";
              break;
          case "minor":
              stats = "https://cdn.discordapp.com/attachments/463776616779087884/471540877190365185/75.png";
              break;
              case "major":
              stats = "https://cdn.discordapp.com/attachments/463776616779087884/471540876556894209/50.png";
              break;
              case "critical":
              stats = "https://cdn.discordapp.com/attachments/463776616779087884/471540874871046145/25.png";
              break;
      }
     let update = dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");
      const Discord1 = new Discord.MessageEmbed()
      .setColor('36393e')
      .setAuthor(`Discord Status`,`https://media.tenor.com/images/b57124f512fa56a18fed9c59d02dc63b/tenor.gif`)
      .setDescription(`**[Status](${res.body.page.url})** | **${res.body.status.description}\nTimeZone:** ${res.body.page.time_zone}`)
      .setImage(stats)
      // .addField(`Current Status`,`**${res.body.status.description}**`)
      .setThumbnail('https://cdn.dribbble.com/users/739109/screenshots/3669385/updated_the__discordapp_loading_logo_that_i_created_last_year__so_pretty__-_.gif')
      // .addField(`Updated At`,`**${res.body.page.updated_at}**`)
      .setFooter(`${now}`)
      // .setTimestamp()
      message.channel.send(Discord1)
  });
};
}

module.exports = speedtest;