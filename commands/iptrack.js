/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const { MessageEmbed } = require('discord.js');
var ipLocator = require('ip-locator')
const dateFormat = require('dateformat');


class iptrack extends Command {
  constructor(client) {
    super(client, {
      name: 'ip',
      description: 'Shows the current guild icon.',
      usage: 'guildicon',
      aliases: ['gicon', 'sicon'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(msg, args) {
    var now = new Date();
    ipLocator.getDomainOrIPDetails(`${args.join(' ')}`,'json', function (err, data) {
        console.log(data)
        // const iptrack = new MessageEmbed()
        // .setTitle(`Ip track⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`)
        // .setColor(`36393e`)
        // .setFooter(now)
        // // .setTimestamp()
        // .setDescription(`\`\`\`asciidoc\n As :: ${data.as}\n City :: ${data.city}\n Country :: ${data.country}\n ISP :: ${data.isp}\n LAT :: ${data.lat}\n lon :: ${data.lon}\n Org :: ${data.org}\n Query :: ${data.query}\n Region :: ${data.region}\n Region Name :: ${data.regionName}\n Status :: ${data.status}\n Zip :: ${data.zip}\`\`\``)
        msg.channel.send(`\`\`\`asciidoc\n As :: ${data.as}\n City :: ${data.city}\n Country :: ${data.country}\n ISP :: ${data.isp}\n LAT :: ${data.lat}\n lon :: ${data.lon}\n Org :: ${data.org}\n Query :: ${data.query}\n Region :: ${data.region}\n Region Name :: ${data.regionName}\n Status :: ${data.status}\n Zip :: ${data.zip}\`\`\``)
      });
}
}

module.exports = iptrack;