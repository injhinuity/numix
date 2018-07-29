/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require('discord.js');
function checkDays(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " day" : " days") + " ago";
};

class Serverinfo1 extends Command {
  constructor(client) {
    super(client, {
      name: 'serverinfo1',
      description: 'Shows the current server information.',
      usage: 'serverinfo',
      aliases: ['sinfo', 'siv'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(message) {
    let lvl = 'N/A';
    if (message.guild.verificationLevel == 0) lvl = 'None';
    else if (message.guild.verificationLevel == 1) lvl = 'Low';
    else if (message.guild.verificationLevel == 2) lvl = 'Medium';
    else if (message.guild.verificationLevel == 3) lvl = 'High';
    else if (message.guild.verificationLevel == 4) lvl = 'Secure';
    let region = {
        "brazil": "Brazil",
        "eu-central": "Central Europe",
        "singapore": "Singapore",
        "us-central": "U.S. Central",
        "sydney": "Sydney",
        "us-east": "U.S. East",
        "us-south": "U.S. South",
        "us-west": "<a:usa:466300306301648896> U.S. West",
        "eu-west": "Western Europe",
        "vip-us-east": "VIP U.S. East",
        "london": "London",
        "amsterdam": "Amsterdam",
        "hongkong": "Hong Kong"
    };
    let treeviewmember = [
           `\`\`\`asciidoc\n
├──:: Members
├──:: ${message.guild.memberCount}
│  └──:: Online
├──:: ${message.guild.members.filter(o => o.presence.status === 'online').size}
│  └──:: Idle
├──:: ${message.guild.members.filter(i => i.presence.status === 'idle').size}
│  └──:: DnD
├──:: ${message.guild.members.filter(dnd => dnd.presence.status === 'dnd').size}
│  └──:: Invis
├──:: ${message.guild.members.filter(off => off.presence.status === 'offline').size}\`\`\``
    ].join('\n');
    let veri = message.guild.features[0];
    switch (veri) {
        case "VERIFIED":
            veri = "<:verified:468469284235116565>";
            break;
    }
    const serverembed = new Discord.MessageEmbed()
    .setTitle(`${message.guild.name} ${veri || " "}`)
    // .setThumbnail(`${message.guild.iconURL()}`)
    .setDescription(`\`\`Created - ${message.guild.createdAt.toString().substr(0, 15)}, ${checkDays(message.guild.createdAt)}\`\``)
    .addField(`Member Stats`,`${treeviewmember}\n**Extras Links:** [\`\`Server Icon\`\`](${message.guild.iconURL()})`,true)
    .addField(`Channel Information`,`• Total Channels: ${message.guild.channels.size.toLocaleString()}\n• Text Channel: ${message.guild.channels.filter(c => c.type === 'text').size}\n• Voice Channel: ${message.guild.channels.filter(c => c.type === 'voice').size}\n• Nsfw Channel: ${message.guild.channels.filter(c => c.nsfw).size}\n\n**Additional Information**\n\n• Verification [${message.guild.verificationLevel}]: \`\`${lvl}\`\`\n• Region: ${region[message.guild.region]}\n• Name: ${message.guild.name}\n• Guild ID: \`\`${message.guild.id}\`\``,true)
    .setColor('36393e')
    .setTimestamp()
    .setFooter(`${message.author.username} | ${message.channel.name}`,
    message.guild.iconURL() ? message.guild.iconURL() : 'https://imgur.com/ik9S8V5.png')
    const serverembed1 = new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name}`)
    .setImage(`http://gifimage.net/wp-content/uploads/2017/10/coming-soon-gif-6.gif`)
    .setColor('36393e')
    .setTimestamp()
    .setFooter(`${message.author.username} | ${message.channel.name}`,
    message.guild.iconURL() ? message.guild.iconURL() : 'https://imgur.com/ik9S8V5.png')
    const m = await message.channel.send(serverembed).catch(console.error);
    m.react('466320932479303680').then( r => {
      m.react('466320932617584643')
      let page = 1;
        const backwardsFilter = (reaction, user) => reaction.emoji.id === '466320932479303680' && user.id === message.author.id;
  const forwardsFilter = (reaction, user) => reaction.emoji.id === '466320932617584643' && user.id === message.author.id;
  const backwards = m.createReactionCollector(backwardsFilter, { time: 60000 });
  const forwards = m.createReactionCollector(forwardsFilter, { time: 60000 });
  backwards.on('collect', r => { 
    if (page === 1) return; 
    page--; 

    m.edit(serverembed) 
  })

  forwards.on('collect', r => { 
    page++;


    m.edit(serverembed1) 
  })
})
  }
  }


module.exports = Serverinfo1;