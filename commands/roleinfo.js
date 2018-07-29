/* eslint linebreak-style: 0 */
const Command = require('../util/Command.js');
const Discord = require('discord.js');
const moment = require('moment');

class Roleinfo extends Command {
  constructor(client) {
    super(client, {
      name: 'roleinfo',
      description: 'Shows the role information.',
      usage: 'roleinfo',
      aliases: ['rinfo', 'role'],
      cooldown: 5,
      category: 'General'
    });
  }

  async run(message, args) {
    //   console.log('working')
    let role = message.guild.roles.find('name', `${args[0]}`);
    if (!role) return message.channel.send(`I cannot find \`${args[0]}\``);
    // console.log(message.guild.roles.find('name', args.length > 0 ? args : args.join(' ')));
    // const allPermissions = Object.entries(role.permissions.serialize()).filter(perm => perm[1]).map(([perm]) => this.perms[perm]).join(' | ');
    const roleInfo = new Discord.MessageEmbed()
      .setColor(role.hexColor || 0xFFFFFF)
      .addField('Name', role.name, true)
      .addField('ID', role.id, true)
      .addField('Color', role.hexColor || 'None', true)
      .addField('Creation Date', moment(role.createdAt), true)
      .addField('Hoisted', role.hoist ? 'Yes' : 'No', true)
      .addField('Raw Position', role.rawPossition, true)
      .addField('Mentionable', role.mentionable ? 'Yes' : 'No', true)
    //   .addField('❯ Permissions', allPermissions);
    return message.channel.send(roleInfo);
  }
  }


module.exports = Roleinfo;