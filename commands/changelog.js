/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require('discord.js');
const request = require('node-superfetch');
const { shorten, base64 } = require('../util/Util.js');
const github_username = "injhinuity";
const github_password = "Encrypt@1";
const numix_github_repo_username = "injhinuity";
const numix_github_repo_name = "numix";



class changelog extends Command {
  constructor(client) {
    super(client, {
      name: 'changelog',
      description: 'Shows the current guild icon.',
      usage: 'guildicon',
      aliases: ['gicon', 'sicon'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(msg, mem,) {
    const { body } = await request
    .get(`https://api.github.com/repos/${numix_github_repo_username}/${numix_github_repo_name}/commits`)
    .set({ Authorization: `Basic ${base64(`${github_username}:${github_password}`)}` });
const commits = body.slice(0, 10);
const embed = new Discord.MessageEmbed()
    .setTitle(`[${numix_github_repo_name}:master] Latest 10 commits`)
    .setColor(0x7289DA)
    .setURL(`https://github.com/${numix_github_repo_username}/${numix_github_repo_name}/commits/master`)
    .setDescription(commits.map(commit => {
        const hash = `[\`${commit.sha.slice(0, 7)}\`](${commit.html_url})`;
        return `${hash} ${shorten(commit.commit.message.split('\n')[0], 50)} - ${commit.author.login}`;
    }).join('\n'));
return msg.channel.send(embed);
}
}

module.exports = changelog;