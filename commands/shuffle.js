/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require('discord.js');

class shuffle extends Command {
  constructor(client) {
    super(client, {
      name: 'shuffle',
      description: 'This command will display the current playing song.',
      usage: 'np',
      aliases: ['nowplaying', 'current'],
      cooldown: 5,
      category: 'Music'
    });
  }

  async run(msg,args) {
    const thisPlaylist = this.client.playlists.get(msg.guild.id);
    if (!msg.member.voiceChannel) {
      const embed888 = new Discord.MessageEmbed()
.setColor('36393e')
.setTitle('You are not in a voice channel!');
msg.channel.send(embed888)
.then(msg => msg.delete(10 * 1000)).catch(error => console.error(error))
return
}

if (!thisPlaylist || thisPlaylist.songs.length === 0) {
      const shuffleerr = new Discord.MessageEmbed()
      .setColor('36393e')
      .setFooter(`There are no songs playing in the guild ${msg.guild.name}`)
msg.channel.send(shuffleerr)
.then(msg => msg.delete(10 * 1000)).catch(error => console.error(error))
return
}

if (msg.member.voiceChannel.id != msg.guild.member(this.client.user).voiceChannel.id) {
      const shuffleerr2 = new Discord.MessageEmbed()
      .setColor('36393e')
      .setFooter(`You must be inside the voice channel playing music to use this command...`)
msg.channel.send(shuffleerr2)
.then(msg => msg.delete(10 * 1000)).catch(error => console.error(error))
return
}
const shufflex = new Discord.MessageEmbed()
.setColor('36393e')
.setTitle(`\`${msg.author.username}\` has requested to shuffle the queue...`)
.setDescription(`*Click on the <a:tick:465524630732668973> to vote*`)
msg.channel.send(shufflex)
.then(async msg => {

await msg.react('465524630732668973')

const filter = (reaction, user) => !this.client.user && reaction.emoji.id === '465524630732668973'
var collector = msg.createReactionCollector(filter, { time: 30 * 1000 })

const requestingUsers = []
thisPlaylist.songs.forEach((song, index) => {
  if (!requestingUsers.includes(song.requestedBy)) {
    requestingUsers.push(song.requestedBy)
  }
})

collector.on('collect', r => {
  requestingUsers.forEach((user, index) => {
    if (!r.users.find('id', user.id)) {
      r.remove(user).catch(error => console.log(error))
    }
  })

  if (r.count > parseInt(Math.ceil(msg.guild.member(this.client.user).voiceChannel.members.size / 2) - 1)) {
    console.log(`shuffle vote successful`)

    let songs = thisPlaylist.songs
    let firstSong = songs.shift()

    let clonedQueue = songs.slice()

    songs.shift()
    songs.forEach((song, index) => {
      let newIndex = (index + Math.floor((Math.random() * songs.length) + 1))
      if (newIndex > songs.length) {
        newIndex = songs.length
      }

      clonedQueue.splice(index, 1)
      clonedQueue.splice(newIndex, 0, song)
    })

    clonedQueue.splice(0, 0, firstSong)
    thisPlaylist.songs = clonedQueue
    collector.stop()
  }
})

collector.on('end', collected => {
  msg.delete(0)
})
  })
  }
}
module.exports = shuffle;