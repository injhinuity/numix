const Command = require('../util/Command.js');
const Discord = require('discord.js');

class Ping extends Command {
  constructor(client) {
    super(client, {
      name: 'fping',
      description: 'This command will get the ping of the client',
      usage: 'ping',
      aliases: ['pong'],
      cooldown: 5,
      category: 'System'

    });
  }

  async run(message) { 
    const init = Date.now(); // Get the ms before editing the message.
    const pingembed1 = new Discord.MessageEmbed()
    .setColor('36393e')
    .setFooter(`Pinging...`)
    const m = await message.channel.send(pingembed1);
    const pingembed = new Discord.MessageEmbed()
    // .setColor('36393e')
    .setColor('7289da')
    .setDescription(`<a:Like:465525508281597953> [__\`\`Latency\`\`__] - 1ms\n                 └── *Heartbeat - 1*ms`)
    m.edit(pingembed);
  }
}

module.exports = Ping;