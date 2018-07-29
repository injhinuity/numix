const request = require('request');
const cheerio = require('cheerio');
const utils = require('../util/utils');
const Discord = require('discord.js');
const Command = require('../util/Command.js');

/* eslint-disable no-useless-escape */
/* eat a dick, codacy */

const gcolor = ['#4285FA', '#0F9D58', '#F4B400', '#DB4437'];

class Google extends Command {
  constructor(client) {
    super(client, {
      name: 'google',
      description: 'Searches something on Google.',
      category: 'Utilities',
      usage: 'google <search:string>',
      extended: 'Searches Google for your question.',
      aliases: ['g'],
      botPerms: ['EMBED_LINKS'],
      permLevel: 'General',
    });
  }


  async run(msg, args, level) { // eslint-disable-line no-unused-vars   
  if (args.length < 1) {
     throw msg.channel.send('You must enter something to search for!');
  }

  msg.delete();
  msg.channel.send('<a:search:472505065245114368> Searching...').then(m => {
      request.get('http://google.com/search?client=chrome&rls=en&ie=UTF-8&oe=UTF-8&q=' + args.join('+'), (err, res, body) => {
          if (!err && res.statusCode === 200) {
              let $ = cheerio.load(body);
              var results = [];
              $('.g').each((i) => {
                  results[i] = {};
              });
              $('.g>.r>a').each((i, e) => {
                  var raw = e.attribs['href'];
                  results[i]['link'] = raw.substr(7, raw.indexOf('&sa=U') - 7);
                  
              });
              $('.g>.s>.st').each((i, e) => {
                  results[i]['description'] = getText(e);
              });

              results = results.filter(r => r.link && r.description);
              results = results.splice(1, 2);
              m.edit('', {
                  embed: utils.embed(`Search results for \`${args.join(' ')}\``, results.map(r => r.link + '\n\t' + r.description + '\n').join('\n')) });
                  
          } else {
              m.edit(`<a:close:465524668560834581> Error! (${res.statusCode}): ${res.statusMessage}`);
          }
      });
  });
};
}

module.exports = Google;
function getText(children) {

  if (children.children) return getText(children.children);
  return children.map(c => {
      return c.children ? getText(c.children) : c.data;
  }).join('');
}