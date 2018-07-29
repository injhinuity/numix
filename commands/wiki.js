const Command = require('../util/Command.js');
const Discord = require('discord.js');
const snekfetch = require('snekfetch');
const wiki1 = require('wikijs').default;
// const Intlpedia = require('intl-wikipedia')
const moment = require("moment");
require("moment-duration-format");
class wiki extends Command {
	constructor(client) {
		super(client, {
			name: 'wiki',
			description: 'wiki <search>',
			usage: 'discord',
			aliases: ['eiki'],
			cooldown: 5,
			category: 'System',
		});
	}
	async run(message, args) {
		const article = await snekfetch.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${args.join(" ")}`).then(res => res.body).catch(() => {
			throw "I couldn't find a wikipedia article with that title!";
		});
		// console.log(article)
		wiki1().page(`${args.join(' ')}`).then(page => {
			page.info().then(info => {
				console.log(info);
        const wikiembed = new Discord.MessageEmbed()
        .setURL(article.content_urls.desktop.page)
        .setColor('36393e')
        .setTitle(article.title)
        .setDescription(article.extract)
        .setThumbnail((article.thumbnail && article.thumbnail.source) || 'https://i.imgur.com/fnhlGh5.png')
        .addField(`Birth Name`,`${info.birthName}`,true)
        .addField(`Birth Date`,`${moment.utc(info.birthDate.date).format("MMMM Do YYYY")} | Age: ${info.birthDate.age}`,true)
        .addField(`Birth Place`,`${info.birthPlace}`,true)
        .addField(`Residence`,`${info.residence}`,true)
        .addField(`HomeTown`,info.homeTown,true)
        .addField(`Salary`,info.salary,true)
        .addField(`Children`,info.children,true)
        message.channel.send(wikiembed);
    });
})
}
}
module.exports = wiki;