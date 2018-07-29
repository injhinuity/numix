const Command = require('../util/Command.js');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const { post } = require('snekfetch');
class Queue2 extends Command {
  constructor(client) {
    super(client, {
      name: 'queue2',
      description: 'This command will display all songs in the queue.',
      extended: 'This command will display all of the songs in the queue, if the queue is too large, it will upload the queue to hastebin, where the user could see all of the songs',
      usage: 'queue',
      cooldown: 5,
      category: 'Music'
    });
  }

  async run(message) {
   
      let index = 0;
    const voiceChannel = message.member.voiceChannel;
    const info1 = await ytdl.getInfo(message.client.playlists.get(message.guild.id).songs[0].url);
    if (!voiceChannel) return this.client.embed('noVoiceChannel', message);
    if (!this.client.playlists.has(message.guild.id)) return this.client.embed('emptyQueue', message);
    let queueembed2 = new Discord.MessageEmbed()
    .setAuthor(`Current Guild Queue(${message.client.playlists.get(message.guild.id).songs.length})`)
    .setColor('36393e')
    .setDescription(message.client.playlists.get(message.guild.id).songs.map(song => `[__\`${++index}\`__] • ${song.title}\n   ⠀└─ *<https://youtu.be/${song.id}> (${song.durationh}:${song.durationm}:${song.durations}) <:human:466405714743787520> Requester - ${song.requestedBy}*`))
    .setFooter(`Now playing: ${message.client.playlists.get(message.guild.id).songs[0].title}`,info1.author.avatar);

    try {
        await message.channel.send(queueembed2);
      } catch (error) {
        const { body } = await post('https://www.hastebin.com/documents').send(message.client.playlists.get(message.guild.id).songs.map(song => `- ${song.title}`).join('\n'));
        message.channel.send(`Queue was too long, uploaded it to hastebin: https://www.hastebin.com/${body.key}.txt`);
		// return message.channel.send(queueembed2);
    // return this.client.embed('queueEmbed', message);
      }
} 
}


module.exports = Queue2;