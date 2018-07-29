/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require('discord.js');
const embed = new Discord.MessageEmbed();
const config = require('../config.json')
const db = require('quick.db')

class guildicon extends Command {
  constructor(client) {
    super(client, {
      name: 'radio',
      description: 'Shows the current guild icon.',
      usage: 'guildicon',
      aliases: ['gicon', 'sicon'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(msg, args) {
    // const command = msg.content.split(" ")[0].substring(config.prefix.length); // Command
    // const suffix = msg.content.substring(command.length + config.prefix.length + 1); // Arguments
    // if (!msg.member.voiceChannel) return msg.channel.send('You are not on a voice channel.');
    // if (!msg.member.voiceChannel.joinable) return msg.channel.send("I\'m unable to play music in this channel.");
    // if (!suffix) {
    //     embed.setDescription("• Insert a correct radio to play.\n\n`[-]` **Available radios:** `Rap, jazz & dubstep`");
    //     embed.setColor("#b92727");
    //     return msg.channel.send({ embed });
    // }
    // let radio; // Empty Variable
    // if (suffix.toLowerCase() == "rap") {
    const  radio = "A-RAP-FM-WEB";
    // } else if (suffix.toLowerCase() == "jazz") {
    //     radio = "WineFarmAndTouristradio";
    // } else if (suffix.toLowerCase() == "dubstep") {
    // const  radio = "ELECTROPOP-MUSIC";
    // } else {
    //     embed.setDescription("• Insert a correct radio to play.\n\n`[-]` **Available radios:** `Rap, jazz & dubstep`");
    //     embed.setColor("#b92727");
    //     return msg.channel.send({ embed });
    // }
    let fetched = await db.fetch(`color_${msg.author.id}`);
    if(fetched == null) return;
        let veri = fetched;
        switch (veri) {
            case "cyan":
                veri = "https://78.media.tumblr.com/f529bd43a1e30632c653461b6336ad20/tumblr_inline_ns1yeuEPn81s7u34q_500.gif";
                break;
                case "red":
                veri = "https://78.media.tumblr.com/74cf2260559a102989979b99dd6242c4/tumblr_inline_ns3vpvZS7Q1s7u34q_500.gif";
                break;
                case "purple":
                veri = "https://78.media.tumblr.com/8a7ee8f0805b82c404cf240367943815/tumblr_inline_ns1ypbnaL81s7u34q_500.gif";
                break;
                case "blue":
                veri = "https://78.media.tumblr.com/6de125be3f11c4d1762e8dc9c652f51e/tumblr_inline_nsrztrwkzR1s7u34q_500.gif";
                break;
        }
    msg.member.voiceChannel.join().then(connection => {
        require('http').get("http://streaming.radionomy.com/" + radio, (res) => {
            console.log(res)
            connection.play(res);
            embed.setColor("36393e");
            embed.setThumbnail('https://cdn.discordapp.com/attachments/463776616779087884/472185573612716032/ezgif.com-crop_4.gif')
            // embed.setImage('https://cdn.discordapp.com/attachments/463776616779087884/472185186579251200/ezgif.com-crop_3.gif')
            // embed.setDescription(`****`);
            embed.addField(`Numix radio connected and playing!`,`Started by: ${msg.author.tag}\nType \`\`nu!leave\`\` to stop the radio`)
            embed.setFooter(`Source: radionomy.com`,veri)
            embed.setTimestamp(new Date())
            msg.channel.send({ embed });
        });
    }).catch(err => "**Error:** ```\n" + err + "```");  
}
}

module.exports = guildicon;