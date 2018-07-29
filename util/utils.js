// const bot = require('../utils/bot.js');
const MessageEmbed = require('discord.js').MessageEmbed;

exports.randomSelection = function () {
    return String(arguments[Math.floor(Math.random() * arguments.length)]);
};

const randomFooter = function () {
    return exports.randomSelection(
        'just add water!',
        'Powered by squirrels!',
        'codeisluvcodeislife',
        'Where did you get that?',
        'WHAT DID YOU BREAK!?',
        'D-D-D-DROP THE BASS',
        'Eat, Sleep, Dubstep'
    );
};

exports.embed = (title, description = '', fields = [], options = {}) => {
    let url = options.url || '';
    let footer = options.footer === undefined ? true : options.footer;

    if (options.inline) fields = fields.map(obj => { obj.inline = true; return obj; });
    if (fields.length > 0) fields.push({ name: '\u200b', value: '\u200b' });
    if (url !== '') description += '\n';

        return new MessageEmbed({ fields, video: options.video || url })
            .setTitle(title)
            .setColor('36393e')
            .setDescription(description)
            .setImage(options.image || url)
            // .setTimestamp(options.timestamp ? new Date() : null)
            .setFooter(footer ? new Date().toLocaleString() : '',"http://diylogodesigns.com/blog/wp-content/uploads/2016/04/google-logo-icon-PNG-Transparent-Background.png")
};

exports.multiSend = function (channel, messages, delay) {
    delay = delay || 100;
    messages.forEach((m, i) => {
        setTimeout(() => {
            channel.sendMessage(m);
        }, delay * i);
    });
};

exports.sendLarge = function (channel, largeMessage, options = {}) {
    var message = largeMessage;
    var messages = [];
    var prefix = options.prefix || '';
    var suffix = options.suffix || '';

    var max = 2000 - prefix.length - suffix.length;

    while (message.length >= max) {
        var part = message.substr(0, max);
        var cutTo = max;
        if (options.cutOn) {
            cutTo = part.lastIndexOf(options.cutOn);
            part = part.substr(0, cutTo);
        }
        messages.push(prefix + part + suffix);
        message = message.substr(cutTo);
    }

    if (message.length > 1) {
        messages.push(prefix + message + suffix);
    }

    this.multiSend(channel, messages, options.delay);
};
