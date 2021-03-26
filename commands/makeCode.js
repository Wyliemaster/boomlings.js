const Discord = require("discord.js");
const botconfig = require("../botsettings.json");
const request = require('request');
const udid = require(`${__dirname}/../lib/udid.js`);
let Udid = new udid();
module.exports.run = async (bot, message, args) => {
    if (botconfig.setup.server != 'www.robtopgames.com/Boomlings')
        return message.channel.send("This Command is only usable on the official Boomlings Servers");
    request.post(`http://${botconfig.setup.server}/getRefID.php`, {
        form: {
            udid: Udid.udidGen(),
            secret: "Wmfd2893gb7"
        }
    }, function callback(err, httpResponse, body) {
        console.log(httpResponse, body);
        if (body == '-1')
            return message.channel.send("Robert said no");
        message.channel.send(`RefID Generated: \`${body}\``);
    });
};
module.exports.config = {
    name: "makeCode",
    description: "Generates a new RefID which you can use in-game",
    usage: `${botconfig.setup.prefix}makeCode`,
    accessableby: "Members",
    aliases: ['refID', 'helpidonthaveanyfriends', 'makecode']
};
