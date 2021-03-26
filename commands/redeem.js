const Discord = require("discord.js");
const botconfig = require("../botsettings.json");
const request = require('request');
const udid = require(`${__dirname}/../lib/udid.js`);
let Udid = new udid();
module.exports.run = async (bot, message, args) => {
    if (args[0] == undefined)
        return message.channel.send("No args");
    let gennedUdid = Udid.udidGen();
    request.post(`http://${botconfig.setup.server}/registerReferral.php`, {
        form: {
            udid: gennedUdid,
            secret: "Wmfd2893gb7",
            refID: args[0]
        }
    }, function callback(err, httpResponse, body) {
        if (body == 1)
            return message.channel.send(`\`${args[0]}\` has just been reward 500 coins.`);
        if (body == 'kE01')
            return message.channel.send(`Error: ${body} - Please try again`);
        if (body == 'kE02')
            return message.channel.send(`Error: ${body} - RefID is invalid`);
        if (body == 'kE03')
            return message.channel.send(`Error: ${body} - Now what are the odds of that! the refID belongs to the bots UDID!. Please try again`);
        return message.channel.send(`Error: ${body} - Unknown error\n\n__Debug Info__\n\n${gennedUdid}, ${args[0]}`);
    });
};
module.exports.config = {
    name: "redeem",
    description: "redeem Ref codes",
    usage: `${botconfig.setup.prefix}redeem`,
    accessableby: "Members",
    aliases: ['redeemRefID', 'claim']
};
