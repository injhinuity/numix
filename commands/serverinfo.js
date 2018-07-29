/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require('discord.js');
function checkDays(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " day" : " days") + " ago";
};

class Serverinfo extends Command {
  constructor(client) {
    super(client, {
      name: 'serverinfo',
      description: 'Shows the current server information.',
      usage: 'serverinfo',
      aliases: ['sinfo', 'si'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(message) {
    let lvl = 'N/A';
    if (message.guild.verificationLevel == 0) lvl = 'Unrestricted';
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
    // let status1 = message.guild.owner.user.presence.status;
    // switch (status1) {
    //     case "online":
    //         status1 = "<a:online:466081164906594304>";
    //         break;
    //     case "dnd":
    //         status1 = "<a:dnd:466243707956363284>";
    //         break;
    //     case "idle":
    //         status1 = "<a:idle:466243711437897749>";
    //         break;
    //     case "offline":
    //         status1 = "<a:invisible:466243711534104577>";
    //         break;
    // }
    const serverembed = new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name} / ${message.guild.id}`,
    message.guild.iconURL() ? message.guild.iconURL() : 'https://imgur.com/ik9S8V5.png')
    .setColor('36393e')
    .setDescription(`Hey **${message.author.username}**, here is the information of **${message.guild.name}**.\nThe server has over **${message.guild.memberCount}** members.\nCreated - \`\`${message.guild.createdAt.toString().substr(0, 15)}, ${checkDays(message.guild.createdAt)}\`\``)
    .setThumbnail(message.guild.iconURL())
    // .addBlankField()
    .addField(`Server stats`,`Members: ${message.guild.memberCount}\n<a:online:466081164906594304> Online: ${message.guild.members.filter(o => o.presence.status === 'online').size}\n<a:idle:466243711437897749> Idle: ${message.guild.members.filter(i => i.presence.status === 'idle').size}\n<a:dnd:466243707956363284> DnD: ${message.guild.members.filter(dnd => dnd.presence.status === 'dnd').size}\n<a:invisible:466243711534104577> Offline: ${message.guild.members.filter(off => off.presence.status === 'offline').size}`,true) //\nRoles: ${message.guild.roles.array().length > 0 ? message.guild.roles.array().length : '0'}`,true)
    // .addField(`Server Owner`,`Owner: ${message.guild.owner.username}\nID: \`\`${message.guild.owner.user.id}\`\`\nDiscrim: ${message.guild.owner.user.discriminator}\nTag: \`\`${message.guild.owner.user.tag}\`\`\nAvatar: [owner avatar](${message.guild.owner.user.displayAvatarURL()})\nStatus: ${message.guild.owner.user.presence.status}${status1}`,true)
    .addField(`Channel Information⠀⠀⠀⠀⠀⠀⠀`,`• Total Channels: ${message.guild.channels.size.toLocaleString()}\n• Text Channel: ${message.guild.channels.filter(c => c.type === 'text').size}\n• Voice Channel: ${message.guild.channels.filter(c => c.type === 'voice').size}\n• Nsfw Channel: ${message.guild.channels.filter(c => c.nsfw).size}`,true)
    .addField(`Additional Information`,`• Verification [${message.guild.verificationLevel}]: \`\`${lvl}\`\`\n• Region: ${region[message.guild.region]}\n• Name: ${message.guild.name}\n• Guild ID: \`\`${message.guild.id}\`\``,true)
    .addField(`Extras`,`📎 Links: [\`\`Server Icon\`\`](${message.guild.iconURL()})`)
    .setFooter(`${message.author.tag}/${message.author.id} | ${message.channel.name}`,message.author.displayAvatarURL())
    .setTimestamp()
    
    message.channel.send(serverembed)
  }
  }


module.exports = Serverinfo;