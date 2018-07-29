const Command = require('../util/Command.js');
const Discord = require('discord.js');
const { exec } = require("child_process");
const { post } = require("snekfetch");

class exec1 extends Command {
    constructor(client) {
      super(client, {
        name: 'exec',
        description: 'discord',
        usage: 'discord',
        aliases: ['net'],
        cooldown: 5,
        category: 'System',
  
      });
    }
async run (msg, args) {
  exec(args.join(" "), (err, stdout, stderr) => {
    // if (err) return msg.error(err, "execute this shell command!");
    // const output = `📥 | **Input**\n\`\`\`xl\n${args.join(" ")}\n\`\`\`\n📤 | **Output**\n\`\`\`xl\n${stdout}\n\`\`\`\n❌ | **Error**\n\`\`\`xl\n${stderr}\n\`\`\``;
    const output = `\`\`\`xl\n${stdout}\n\`\`\``;
    // let embed = new Discord.MessageEmbed()
    // .setColor('36393e')
    // .setDescription(output)
    // .setFooter(`Executed`)
    // .setTimestamp(new Date())
    if (output.length > 2000) {
      post(`https://hastebin.com/documents`).send(`${stdout}\n${"-".repeat(100)}\n${stderr}`).then(url => { // eslint-disable-line
      return msg.channel.send(`Output has been uploaded onto Hastebin!\n**https://hastebin.com/${url.body.key}**`, {
        files: [
          {
            name: "output.txt",
            attachment: Buffer.from(output)
          }
        ]
      });
    }).catch(e => msg.error(e, "execute this shell command!")); // eslint-disable-line
    } else msg.channel.send(output); // eslint-disable-line
  });
};
}

module.exports = exec1;