const Discord = require("discord.js");
const botconfig = require("../botsettings.json");
const fs = require("fs");
module.exports.run = async (bot, message, args) => {
    const help = new Discord.MessageEmbed().setTitle('__Help__').setColor(`0x${botconfig.setup.commandColour}`)
        .setDescription("For support with the setup, please refer to the [Setup page](https://github.com/Wyliemaster/boomlings.js/blob/main/setup.md). If you have any other issues then please contact [Wylie](https://twitter.com/TheWylieMaster)")
        .addField('Info', `Prefix: \`${botconfig.setup.prefix}\`\nServer: \`${botconfig.setup.server}\``);
    fs.readdir("./commands/", (err, files) => {
        if (err)
            return message.reply("Sorry There was an Error, please check the logs for more details"), console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js");
        let len, command, listOfCommands = '';
        for (let i = 0; i < jsfile.length; i++) {
            len = jsfile[i].length;
            command = jsfile[i].slice(0, len - 3);
            listOfCommands += `\`${command}\`\n`;
        }
        help.addField("__Commands__", listOfCommands);
        message.channel.send(help);
    });
};
module.exports.config = {
    name: "help",
    description: "Provides helpful information",
    usage: `${botconfig.setup.prefix}help`,
    accessableby: "Members",
    aliases: ['commands']
};
