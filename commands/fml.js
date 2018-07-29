const Command = require('../util/Command.js');
const Discord = require('discord.js');
const fml1 = require('randomfmylife');
 


class fml11 extends Command {
  constructor(client) {
    super(client, {
      name: 'fml',
      description: 'fml',
      usage: 'fml',
      aliases: ['fml'],
      cooldown: 5,
      category: 'General',

    });
  }

  async run(message) { 
    fml1().then(fml => {
        // console.log(fml);
      let fmlembed = new Discord.MessageEmbed()
      .setDescription(fml)
      .setColor('36393e')
      message.channel.send(fmlembed)
    
  });
}
}

module.exports = fml11;