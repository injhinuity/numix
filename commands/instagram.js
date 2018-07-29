const Command = require('../util/Command.js');
const Discord = require('discord.js');
const ipp = require('instagram-profile-picture');
const bud = require('basic-instagram-user-details');
class instagram extends Command {
	constructor(client) {
		super(client, {
			name: 'instagram',
			description: 'instragram <search>',
			usage: 'instagram <search>',
			aliases: ['insta'],
			cooldown: 5,
			category: 'General',
		});
	}
	async run(message, args) {
		if (!args[0]) return message.channel.send(`Incorrect usage, please provide a username to search.`)
		const progress = new Discord.MessageEmbed().setColor('36393e').setImage("https://cdn.discordapp.com/attachments/467425900947046411/468274379080466482/ezgif.com-gif-maker_6.gif")
		let msg = await message.channel.send(progress)
		const user = `${args.join(' ')}`;
		ipp(`${args.join(' ')}`).then(user1 => {
			// console.log(user1);4w
			bud(user, 'bio').then(bio => {
				// console.log(bio);
				bud(user, 'fullname').then(fullname => {
					// console.log(fullname);
					bud(user, 'username').then(username => {
						// console.log(username);
						bud(user, 'followers').then(followers => {
							// console.log(followers);
							bud(user, 'following').then(following => {
								// console.log(following);
								bud(user, 'posts').then(posts => {
									// console.log(following);
									bud(user, 'id').then(id => {
										bud(user, 'verified').then(verified => {
											let veri = verified.data;
											switch (veri) {
												case "true":
													veri = "<:verified:468469284235116565>";
													break;
												case "false":
													veri = "  ";
													break;
											}
											let format = require("number-format.js")
											let Followers = format("#,##0.####", followers.data);
											let Following = format("#,##0.####", following.data);
											let Post1 = format("#,##0.####", posts.data);
            const inst = new Discord.MessageEmbed()
            .setColor('36393e')
            .setTitle(`${fullname.data} ${veri}`)
            .setURL(`https://www.instagram.com/${args.join(' ')}`)
            .setDescription(`${bio.data}`)
            .addField(`Followers`,Followers,true)
            .addField(`Following`,Following,true)
            .addField(`Posts`,Post1,true)
            .addField(`ID`,id.data,true)
            .setFooter(username.data,'http://gifimage.net/wp-content/uploads/2017/11/instagram-logo-gif-9.gif')
            .setThumbnail(user1)
            .setTimestamp()
            message.channel.send(inst)
            msg.delete();
        })
    })
})
})
})
})
})
})
})
}
}
module.exports = instagram;