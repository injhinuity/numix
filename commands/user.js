/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const sm = require("string-similarity");
const moment = require("moment");
require("moment-duration-format");
const status = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline/Invisible"
};


class userinfo extends Command {
  constructor(client) {
    super(client, {
      name: 'userinfo',
      description: 'Shows the current guild icon.',
      usage: 'guildicon',
      aliases: ['uinfo', 'user'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(message, args) {
    let members = [];
  let indexes = [];
  message.guild.members.forEach(function(member) {
      members.push(member.user.username);
      indexes.push(member.id);
  })
  let match = sm.findBestMatch(args.join(' '), members);
  let username = match.bestMatch.target;
  let user = message.mentions.users.first();
  const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.get(indexes[members.indexOf(username)]);
  let status1 = member.user.presence.status;
  switch (status1) {
      case "online":
          status1 = "<a:online:466081164906594304> Online";
          break;
      case "dnd":
          status1 = "<a:dnd:466243707956363284> DnD";
          break;
      case "idle":
          status1 = "<a:idle:466243711437897749> Idle";
          break;
      case "offline":
          status1 = "<a:invisible:466243711534104577> Offline";
          break;
  }
  const UserInfo = new Discord.MessageEmbed()
    .setColor('36393e')
    .setThumbnail(`${member.user.displayAvatarURL()}`)
    //.addField("Guild", `${bot}`, true)
    .addField('Name',`• ${member.user.username}`,true)
    .addField('Profile ID',`• ${member.user.id}`,true)
    // .addField('❯ Tag', user.tag,true)
    .addField("Nickname:",`• ${member.nickname !== null ? `${member.nickname}` : "No nickname"}`, true)
   // .addField(' Last Message', user.lastMessage,true) //Shows the last message you sent dangerous
  //  .addField('❯ Last Message ID', user.lastMessageID,true) //Shows the last message ID your send.
    .addField("Joined Server", `• ${moment.utc(member.guild.joinedAt).format("MMMM Do YYYY")}`, true) //Shows when you joined the guild.
    .addField("Joined Discord", `• ${moment.utc(member.user.createdAt).format("MMMM Do YYYY")}`, true) //Shows the Joined date on discord.
    .addField('Current Status', `• ${status1}`,true) //Shows current status of the user.
    .addField("Presence Status", `• ${member.user.presence.game ? `${member.user.presence.game.name}` : "Not Applicable"}`,true) 
    .addField('Bot', member.user.bot, true)
    .addField("Roles", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`)//Shows the presence of the user.
    .setFooter(`Now showing ${member.user.username}'s Profile`,`${member.guild.iconURL()}`)     //"https://cdn.discordapp.com/attachments/358972132291772416/451898588600074242/profile.png") //Shows user name of the mentioned user or the author and the url image provided.
    //.setFooter(bot.user.username,`${boticon}`)   /// Shows bot icon and user name.
    .setTimestamp(); 
  message.channel.send(UserInfo);
  }
}

module.exports = userinfo;