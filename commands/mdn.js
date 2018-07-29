const Command = require('../util/Command.js');
const request = require('../util/request.js')
const Discord = require('discord.js');

class MDN extends Command {
    constructor(client) {
      super(client, {
        name: 'mdn',
        description: 'mdn <search>',
        usage: 'mdn',
        aliases: ['mdn'],
        cooldown: 5,
        category: 'General',
  
      });
    }
  
    async run(message, args) { 
        return new Promise(async(resolve, reject) => {
            try {
                let args = message.content.split(/\s+/);
                args.shift();
                if (!args[0]) return resolve(await message.channel.createMessage(":x: You must specify something to search"));
                let result = await request.get(`https://developer.mozilla.org/en-US/search.json?locale=en-US&q=${encodeURIComponent(args.join())}`);
                if (!result.data.documents || !result.data.documents.length) return resolve(await message.channel.createMessage(":x: Your search did not returned any result"))
                let firstResult = result.data.documents[0];
                const mdnresult = new Discord.MessageEmbed()
                .setColor('36393e')
                .setTitle('MDN')
                .setURL('https://developer.mozilla.org/en/')
                // .setThumbnail()
                .addField(`Search results`,`Here's the results for [${args.join(" ")}]` + `(
                    https://developer.mozilla.org/en-US/search?locale=en-US&q=${encodeURIComponent(args.join())})`)
                    .addField("**" + firstResult.title + "**",firstResult.excerpt)
                    .setTimestamp(new Date())
                    .setFooter(`MDN Search`,this.client.user.displayAvatarURL())
                await message.channel.send(mdnresult)
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = MDN;