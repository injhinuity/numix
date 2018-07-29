const Event = require('../util/Event.js');
const fs = require('fs');
const chalk = require('chalk');
const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');  
let os = require('os')
let cpuStat = require("cpu-stat")
const memUsage = process.memoryUsage();
const log = console.log;
class Ready extends Event {

  constructor(...args) {
    super(...args);
  }

  async run() {
    // this.client.log(`${this.client.user.tag} is ready in ${this.client.guilds.size} guild and serving ${this.client.guilds.reduce((c, p) => c + p.memberCount, 0)} users!`);
    let Ready = [
      `├───Commands have been retrived from database, initializing project ${this.client.user.username}
       │       │   └───Initialized At > ${moment().format('HH:mm:ss')}
       ├───Advanced Tree View
       │   ├───Client  > ${this.client.user.tag}
       │   ├───Members > ${this.client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
       │   ├───Creator > Ukura#0006
       │   ├───CPU     > ${os.cpus().map(i => `${i.model}`)[0]}
       │   ├───Mem/RSS > ${Math.round(memUsage.rss / 1024 / 1024 * 100) / 100}MB | Heap: ${Math.round(memUsage.heapUsed / 1024 / 1024 * 100) / 100}MB
               └───Swap Size > ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`
  ].join('\n');
  log(`${Ready}`);
    this.client.guilds.forEach(g => {
      if (!this.client.settings.has(g.id)) this.client.setDefaultGuildSettings(g.id);
    });

    if (fs.existsSync('./data/reboot.json')) {
      const data = JSON.parse(fs.readFileSync('./data/reboot.json', 'utf8'));
      const channel = this.client.channels.get(data.channelID);
      const message = await channel.messages.fetch(data.messageID);
      const success =  new Discord.MessageEmbed()
      .setColor('36393e')
      .setFooter('Successfully rebooted the bot!','https://cdn.discordapp.com/emojis/471041193451716608.gif?v=1')
      message.edit(success);
      fs.unlinkSync('./data/reboot.json');
    }
  }
}

module.exports = Ready;