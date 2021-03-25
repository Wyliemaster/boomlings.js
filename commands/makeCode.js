const Discord = require("discord.js");
const botconfig = require("../botsettings.json");
const request = require('request');
module.exports.run = async (bot, message, args) => {
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //ugly but whatever
    let udid0 = getRndInteger(268435456, 4294967295).toString(16);
    let udid1 = getRndInteger(4096, 65535).toString(16);
    let udid2 = getRndInteger(4096, 65535).toString(16);
    let udid3 = getRndInteger(4096, 65535).toString(16);
    let udid4 = getRndInteger(68719476736, 1099511627775).toString(16);
    let udid = `${udid0}-${udid1}-${udid2}-${udid3}-${udid4}`;
    request.post(`http://${botconfig.setup.server}/getRefID.php`, {
        form: {
            udid: udid,
            secret: "Wmfd2893gb7"
        }
    }, function callback(err, httpResponse, body) {
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
    aliases: ['refID', 'helpidonthaveanyfriends']
};
