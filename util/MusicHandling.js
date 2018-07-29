const { MessageEmbed, Util } = require('discord.js');
const ytdl = require('ytdl-core');
const fetchVideoInfo = require('youtube-info');


const handleVideo = async (video, message, voiceChannel, playlist = false) => {
  const queue = message.client.playlists; 
  // console.log(video)
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`,
    channel: video.channel.title,
    channelurl: `https://www.youtube.com/channel/${video.channel.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    thumbnail: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
    author: message.author.username,
    requestedBy: message.author,
    authoravatar: message.author.displayAvatarURL(),
    reqchannel: message.channel.name,
    connectedvc: message.member.voiceChannel.name,
  }; // create the object for each song 
  const info1 = await ytdl.getInfo(song.url);
  // console.log(info1)
  if (!queue.has(message.guild.id)) { // check if there isn't a queue for the guild already
    const queueConstruct = { // create the object with information we require
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true,
      loop: false
    }; 
    queue.set(message.guild.id, queueConstruct); // set the object we just made
    queueConstruct.songs.push(song); // push the song object so we can use it later
    try {
      const connection = await voiceChannel.join(); // join the voice channel
      queueConstruct.connection = connection; // set the connection to be used globally
      play(message.guild, queueConstruct.songs[0], info1); // play the first song in the queue
    } catch (error) { // any errors, HANDLED
      queue.delete(message.guild.id);
      const embed = new MessageEmbed()
        .setAuthor('Error')
        .setDescription(`An error has occured: ${error}`)
        .setColor('36393e');
      return message.channel.send(embed);
    }
  } else {
    if (queue.get(message.guild.id).songs.length >= message.settings.maxqueuelength) return message.client.embed('maxQueue', message);
    queue.get(message.guild.id).songs.push(song); // if the queue exists, it'll push the song object
    if (playlist) return; // if it's a playlist it wont do this so doesn't spam adding songs
    else {
      // const embed = new MessageEmbed()
      //   .setAuthor('Song added!')
      //   .setDescription(`<a:tick:465524630732668973> **[${song.title}](${song.url}) | (${song.durationm}:${song.durations})** has been added to the queue!`)
      //   .setColor('36393e');
      return message.channel.send(`<a:tick:465524630732668973> **${song.title} |** \`\`has been added to the queue!\`\`\n  └── *<https://youtu.be/${song.id}>* (${song.durationm}:${song.durations})`);
    }
  }
  return;
};
  
function play(guild, song, info) {
  fetchVideoInfo(`${info.video_id}`).then(function (videoInfo) {
    // console.log(videoInfo);
  const queue = guild.client.playlists;
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave(); // if there are no songs leave the channel
    queue.delete(guild.id); // and also remove the guild from the collection
    return;
  }
  const dispatcher = queue.get(guild.id).connection.play(ytdl(song.url, {quality:'highest', filter:'audioonly'}, {passes: 3})) // play the song
    .on('end', () => { // when the song ends
      if (!serverQueue.loop) { // if its not looped
        queue.get(guild.id).songs.shift(); // remove the first item from the queue, eg. first song
        setTimeout(() => { // wait 250ms before playing a song due to songs skipping
          play(guild, queue.get(guild.id).songs[0], info); // play the song
        }, 250); 
      } else { // if it is looped it doens't remove the first item
        setTimeout(() => {  // wait 250ms before playing a song due to songs skipping
          play(guild, queue.get(guild.id).songs[0], info); // play the song
        }, 250);		   
      }
    });
  // dispatcher.setVolumeLogarithmic(queue.get(guild.id).volume / 5); // set the volume of the dispatcher
  // const songdurm = String(song.durationm).padStart(2, '0'); // format the time
  // const songdurh = String(song.durationh).padStart(2, '0'); // same ^
  // const songdurs = String(song.durations).padStart(2, '0'); // same ^^
  let songdurm, songdurh, songdurs;
  if (song.durationm < 10) songdurm = "0"+song.durationm;
  if (song.durationm >= 10) songdurm = song.durationm;
  if (song.durations < 10) songdurs = "0"+song.durations;
  if (song.durations >= 10) songdurs = song.durations;
  if (song.durationh < 10) songdurh = "0"+song.durationh;
  if (song.durationh >= 10) songdurh = song.durationh;
  let format = require("number-format.js")
  let like = format( "#,##0.####", videoInfo.likeCount); 
  let dislike = format( "#,##0.####", videoInfo.dislikeCount); 
  let view = format( "#,##0.####", videoInfo.views); 
  const embed = new MessageEmbed() // create a message embed with all of the information
    .setAuthor(song.channel,info.author.avatar)// Channel Name
    // .setURL(song.channelurl) //Channel Url
    .setThumbnail(song.thumbnail)
    // .setImage(song.thumbnail)
    .setDescription(`<:you:470015247709765642> Now Playing\n  ⠀└── [${song.title}](${song.url})`) //Title with redirect link
    .addField('Song Info',`Duration: ${songdurh}:${songdurm}:${songdurs}\nSource: [${song.channel}](${song.channelurl})\nGenre: ${videoInfo.genre}`, true) //Duration
    .addField('Song Statistics',`Views: ${view}\nLikes: ${like}\nDislikes: ${dislike}`,true)
    .setFooter(`version v0.0.1`,`${song.authoravatar}`) //Requested
    .setColor('36393e') //Color
    .setTimestamp();
//     const embed1 = new MessageEmbed() // create a message embed with all of the information
//     .setAuthor(song.channel,info.author.avatar)// Channel Name
//     // .setURL(song.channelurl) //Channel Url
//     .setThumbnail(song.thumbnail)
//     // .setImage(song.thumbnail)
//     .setDescription(`<:you:470015247709765642> Now Playing\n  └── [${song.title}](${song.url})`) //Title with redirect link
//     .addField('Song Info',`Duration: ${songdurh}:${songdurm}:${songdurs}\nSource: [${song.channel}](${song.channelurl})\nGenre: ${videoInfo.genre}`, true) //Duration
//     .addField('Song Statistics',`Views: ${view}\nLikes: ${like}\nDislikes: ${dislike}`,true)
//     .setFooter(`Requested by: ${song.author} | ${song.reqchannel}`,`${song.authoravatar}`) //Requested
//     .setColor('36393e') //Color
//     .setTimestamp();
  if (!serverQueue.loop) return queue.get(guild.id).textChannel.send(embed); //Checks if the current song is looped and then send!
//   async function m1() { 
//   const m = await queue.get(guild.id).textChannel.send(embed); //Checks if the current song is looped and then send!
//   m.react('466320932479303680').then( r => {
//     m.react('466320932617584643')
//     let page = 1;
//       const backwardsFilter = (reaction, user) => reaction.emoji.id === '466320932479303680' && user.id === song.requestedBy.id;
// const forwardsFilter = (reaction, user) => reaction.emoji.id === '466320932617584643' && user.id === song.requestedBy.id;
// const backwards = m.createReactionCollector(backwardsFilter, { time: 60000 });
// const forwards = m.createReactionCollector(forwardsFilter, { time: 60000 });
// backwards.on('collect', r => { 
//   if (page === 1) return; 
//   page--; 

//   m.edit(embed) 
// })

// forwards.on('collect', r => { 
//   page++;


//   m.edit(embed1) 
// })
// })
  // }
  // m1()
})
}


module.exports = handleVideo; // export the function