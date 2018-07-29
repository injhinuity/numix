const Command = require('../Util/Command.js');
const { version } = require('discord.js');
const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
let os = require('os')
let cpuStat = require("cpu-stat")
// const memUsage = process.memoryUsage();


class Stats1 extends Command {
  constructor(client) {
    super(client, {
      name: 'stats',
      description: 'Gives some useful bot statistics',
      usage: 'stats',
      category: 'System',
      botPerms: ['SEND_MESSAGES'],
      permLevel: 'User'
    });
  }


  async run(message, args, level) { // eslint-disable-line no-unused-vars
    const duration = moment.duration(this.client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
    let statsembed = new Discord.MessageEmbed()
    .setColor('36393e')
    .setDescription(`\`\`\`asciidoc\n
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• CPU        :: ${os.cpus().map(i => `${i.model}`)[0]}
• CPU Speed  :: ${os.cpus().map(i => `${i.speed}`)[0]} MHz
• Swap Size  :: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB
• Users      :: ${this.client.users.size.toLocaleString()}
• Servers    :: ${this.client.guilds.size.toLocaleString()}
• Channels   :: ${this.client.channels.size.toLocaleString()}
• Discord.js :: v${version}
• Node       :: ${process.version}
• Ping       :: ${Math.round(this.client.ping)}ms\`\`\``)
    
    .setFooter(`Total Commands: ${this.client.commands.size.toLocaleString()}`,`https://www.getrealgolfstats.com/UserFiles/images/Icons/stats_icon_grey.png`)
    message.channel.send(statsembed);
}
}
module.exports = Stats1;