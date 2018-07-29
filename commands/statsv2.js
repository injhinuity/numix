const Command = require('../Util/Command.js');
const { version } = require('discord.js');
const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
let os = require('os')
let cpuStat = require("cpu-stat")
// const memUsage = process.memoryUsage();
const dateFormat = require('dateformat');


class Stats1 extends Command {
  constructor(client) {
    super(client, {
      name: 's',
      description: 'Gives some useful bot statistics',
      usage: 'stats',
      category: 'System',
      botPerms: ['SEND_MESSAGES'],
      permLevel: 'User'
    });
  }


  async run(message, args, level) { // eslint-disable-line no-unused-vars
    var now = new Date();
    const duration = moment.duration(this.client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
    let statsembed = new Discord.MessageEmbed()
    .setColor('36393e')
//     .setDescription(`\`\`\`asciidoc\n
// • Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
// • Uptime     :: ${duration}
// • CPU        :: ${os.cpus().map(i => `${i.model}`)[0]}
// • CPU Speed  :: ${os.cpus().map(i => `${i.speed}`)[0]} MHz
// • Swap Size  :: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB
// • Users      :: ${this.client.users.size.toLocaleString()}
// • Servers    :: ${this.client.guilds.size.toLocaleString()}
// • Channels   :: ${this.client.channels.size.toLocaleString()}
// • Discord.js :: v${version}
// • Node       :: ${process.version}
// • Ping       :: ${Math.round(this.client.ping)}ms\`\`\``)
.addField(`Numix Information`,`<:server:472194464711049216> Servers - **${this.client.guilds.size.toLocaleString()}**\n<:channels:472194461108273153> Channels - **${this.client.channels.size.toLocaleString()}**\n<:users:472194464857980937> Users - **${this.client.users.size.toLocaleString()}**`,true)
.addField(`Host Information`,`<:mem:472194462064312340> Mem Usage - **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB**\n<:uptime:472194464828358657> Uptime - **${duration}**\n<:swap:472194464081772554> Swap Size - **${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB**`,true)
.addField(`Language & Library`,`<:djs:472194465180680242> **[Discord.js - v${version}](https://discord.js.org/#/)**\n<:nodejs:472194464836878357> **[Node - ${process.version}](https://nodejs.org/en/)**`,true)
.addField(`⠀⠀Creator Information`,`⠀⠀<:owner:472194467785474051> Creator - **[hypergalaxy#0006](https://i.pinimg.com/originals/2e/58/54/2e58542474818f4dffdd07e2df4d9579.jpg)**\n⠀⠀<:date11:472194461007347713> Created At - **${moment.utc(this.client.user.createdAt).format("MMMM Do YYYY")}**`,true)
.setThumbnail(this.client.user.displayAvatarURL({size: 2048}))
    .setFooter(`Commands: ${this.client.commands.size.toLocaleString()} | Ping: ${Math.round(this.client.ping)} • ${moment.utc(new Date()).format("MMMM Do YYYY")}`,`https://www.getrealgolfstats.com/UserFiles/images/Icons/stats_icon_grey.png`)
          // .setTimestamp(new Date())
    message.channel.send(statsembed);
}
}
module.exports = Stats1;