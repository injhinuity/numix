const Command = require('../util/Command.js');
const Discord = require('discord.js');
const db = require('quick.db');

class note extends Command {
  constructor(client) {
    super(client, {
      name: 'note',
      description: 'This command will get the ping of the client',
      usage: 'note',
      aliases: ['nt'],
      cooldown: 5,
      category: 'System'

    });
  }

  async run(message, args, tools) { 
      
  // Compile Information
  let timestamp = Date.now()
 let entry = args.join(' ');

  // Form Embed
const embed = new Discord.MessageEmbed()

 // Verify Input
 if (!entry) { // This will run if no text is given

    // Configure Embed
    embed.setFooter(`Please input text following the command.`)
    embed.setColor('36393e');

    // Return & Send Embed
    return message.channel.send(embed);

  }
  
  // Push To Database
  await db.push(`${message.author.id}_notes`, {
    entry: entry,
    timestamp: timestamp
  });

  // Configure Embed
  embed.setFooter('Saving your notes!','https://cdn.discordapp.com/emojis/416475652922015746.gif?v=1');
  embed.setColor('36393e')
  const done = new Discord.MessageEmbed()
  .setFooter(`Successfully created your note!`,'https://cdn.discordapp.com/emojis/471041193451716608.gif?v=1')
  .setColor('36393e')
  // Send Embed
 const m = await message.channel.send(embed);
 m.edit(done)
  }
}

module.exports = note;