const { MessageEmbed } = require('discord.js');
const { post } = require('snekfetch');
const db = require('quick.db');
/**
 * @description Makes an embed with an error
 * @param {String} type The type of error
 * @param {DiscordMessage} message The message object
 * @param {Array} [args = []] The arguments of the message
 * @returns {MessageEmbed} Sends the embed to whichever channel the original message was sent it
 */

async function embeds(type, message, args) { 
  const embed = new MessageEmbed()
  .setColor('36393e')
  switch (type) {
    case 'noVoiceChannel': {
      embed.setAuthor('Error')
        .setDescription('You must be in a voice channel first!');
      break;
    }
    case 'emptyQueue': {
      embed.setAuthor('Error')
        .setDescription('There is nothing playing!');
      break;
    }
    case 'errorVolume': {
      embed.setAuthor('Error')
        .setDescription('Volume must be a value between 0 and 100.');
      break;
    }
    case 'currentVolume': {
      embed.setAuthor('Volume')
        .setDescription(`Current volume is ${message.client.playlists.get(message.guild.id).connection.dispatcher.volumeLogarithmic * 100}%`);
      break;
    }
    case 'volumeSet': {
      embed.setAuthor('Volume')
        .setDescription(`Volume has been set to ${args[0]}%`);
      break;
    }
    case 'queueEmbed': {
      embed.setAuthor('Queue')
        .setDescription(message.client.playlists.get(message.guild.id).songs.map(song => `**-** ${song.title}`).join('\n'))      
        .setFooter(`Now playing: ${message.client.playlists.get(message.guild.id).songs[0].title}`);
      break;
    }
    case 'loopedEmbed': {
      embed.setAuthor('Looped',`https://cdn.discordapp.com/attachments/463776616779087884/467399219150323721/loop.png`)
        .setDescription(`The song has been looped by ${message.member.displayName}`);
      break;
    }
    case 'unloopedEmbed': {
      embed.setAuthor('Unlooped',`https://cdn.discordapp.com/attachments/463776616779087884/467399221020983296/unloop.png`)
        .setDescription(`The song has been unlooped by ${message.member.displayName}`);
      break;
    }
    case 'nowPlaying': {
      // let npgif =[
      //   `https://78.media.tumblr.com/f529bd43a1e30632c653461b6336ad20/tumblr_inline_ns1yeuEPn81s7u34q_500.gif`
      //   `https://78.media.tumblr.com/8a7ee8f0805b82c404cf240367943815/tumblr_inline_ns1ypbnaL81s7u34q_500.gif`
      //   `https://78.media.tumblr.com/6de125be3f11c4d1762e8dc9c652f51e/tumblr_inline_nsrztrwkzR1s7u34q_500.gif`
      //   `https://78.media.tumblr.com/74cf2260559a102989979b99dd6242c4/tumblr_inline_ns3vpvZS7Q1s7u34q_500.gif`
      
      // ] 
      let fetched = await db.fetch(`color_${message.author.id}`);
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
      const playingFor = new Date () - message.client.playlists.get(message.guild.id).connection.dispatcher.startTime;
        embed.setFooter(`Now Playing`,`${veri}`)
        .setDescription(`**[${message.client.playlists.get(message.guild.id).songs[0].title}](${message.client.playlists.get(message.guild.id).songs[0].url})**\nHas been playing for **${formattedUptime(playingFor)}**`);
      break;
    }
    case 'alreadyPaused': {
      embed.setAuthor('Error')
        .setDescription('The song is already paused!');
      break;
    }
    case 'paused': {
      embed.setAuthor('Paused')
        .setDescription(`The song has been paused by ${message.member.displayName}.`);
      break;
    }
    case 'alreadyResumed': {
      embed.setAuthor('Error')
        .setDescription('The song isn\'t paused!');
      break;
    }
    case 'resumed': {
      embed.setAuthor('Resumed')
        .setDescription(`The song has been resume by ${message.member.displayName}.`);
      break;
    }
    case 'stopped': {
      embed.setAuthor('Stopped')
        .setDescription(`The song has been stopped by ${message.member.displayName}.`);
      break;
    }
    case 'skipped': {
      embed.setAuthor('Skipped')
        .setDescription(`The song has been skipped by ${message.member.displayName}.`);
      break;
    }
    case 'noArgs': {
      embed.setAuthor('Error')
        .setDescription('Please provide me with some arguments!');
      break;
    }
    case 'noPerms-CONNECT': {
      embed.setAuthor('Error')
        .setDescription('I cannot connect to your voice channel, make sure I have the proper permissions!');
      break;
    }
    case 'noPerms-SPEAK': {
      embed.setAuthor('Error')
        .setDescription('I cannot speak in this voice channel, make sure I have the proper permissions!');
      break;
    }
    case 'invalidEntry': {
      embed.setAuthor('Error')
        .setDescription('No or invalid value entered, cancelling video selection.');
      break;
    }
    case 'noSearchResults': {
      embed.setAuthor('Error')
        .setDescription('I could not obtain any search results.');
      break; 
    }
    case 'inactiveCall': {
      embed.setAuthor('Error')
        .setDescription('No one is in the call, leaving due to inactivity.');
      break;
    }
    case 'noSongsFound': {
      embed.setAuthor('Error')
        .setDescription(`No songs found with the search term: ${args.join(' ')}`);
      break;
    }
    case 'summoned': {
      embed.setAuthor('Summoned')
        .setDescription(`${message.client.user.tag} has been forced to join ${message.member.voiceChannel}`);
      break;
    }
    case 'unsummoned': {
      embed.setAuthor('Unsummoned')
        .setDescription(`${message.client.user.tag} has been forced to leave ${message.member.voiceChannel}`);
      break;
    }
    case 'notDJ': {
      embed.setAuthor('Error')
        .setDescription('You must be a DJ to use these commands, please ask an admin disable djonly if you wish to allow non-djs to use music commands');
      break;
    }
    case 'maxQueue': {
      embed.setAuthor('Error')
        .setDescription(`You have reached the max queue length of ${message.settings.maxqueuelength}, please ask an admin to increase the limit`);
      break;
    }
    case 'seek': {
      embed.setAuthor('seeked')
      .setFooter(`I have seeked the song to ${args[0]}`)
      break;
    }
    default: {
      embed.setAuthor('Error')
        .setDescription('Sorry, but an error has occured.');
    }
  }
  try {
    await message.channel.send(embed);
  } catch (error) {
    const { body } = await post('https://www.hastebin.com/documents').send(message.client.playlists.get(message.guild.id).songs.map(song => `- ${song.title}`).join('\n'));
    message.channel.send(`Queue was too long, uploaded it to hastebin: https://www.hastebin.com/${body.key}.txt`);
  }
}

module.exports = embeds;

function formattedUptime(ms) {
  let m, s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s %= 60;
  const h = Math.floor(m / 60);
  m %= 60;
  const hours = `${h === 0 ? '' : h} ${h === 1 ? 'hour,' : h === 0 ? '' : 'hours,'}`;
  const minutes = `${m === 0 ? '' : m} ${m === 1 ? 'minute and' : m === 0 ? '' : 'minutes and'}`;
  const seconds = `${s} ${s === 1 ? 'second' : 'seconds'}`;
  return `${hours} ${minutes} ${seconds}`.trim();
}