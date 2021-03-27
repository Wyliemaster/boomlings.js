const Discord = require("discord.js");
const botconfig = require("../botsettings.json");
const request = require('request');
module.exports.run = async (bot, message, args) => {
    request.post(`http://${botconfig.setup.server}/get_scores.php`, {
        form: {
            name: "player",
            secret: "Wmfd2893gb7"
        }
    }, function callback(err, httpResponse, body) {
        let userData = [];
        let users = body.split(" ");
        for (let i = 0; i < users.length; i++) {
            let data = users[i].split(';');
            if (data.length > 3) {
                userData.push(data);
            }
        }
        const leaderboard = new Discord.MessageEmbed().setTitle('__Global Leaderboard__').setColor(`0x${botconfig.setup.commandColour}`).setThumbnail('https://media.discordapp.net/attachments/818217884886499338/824710893211877376/LevelIcon_025.png');
        console.log(userData.length);
        let score, scoreLevel, scoreScore;
        let loop = 25;
        if (userData.length < 25) {
            loop = userData.length;
        }
        for (let i = 0; i < loop; i++) {
            score = userData[i][2];
            scoreLevel = score.slice(1, 3);
            scoreScore = score.slice(4, score.length);
            leaderboard.addField(`__Rank ${i + 1}__`, `Name: \`${userData[i][0]}\`\nHighest Level: \`${scoreLevel}\`\nScore: \`${scoreScore}\``);
        }
        message.channel.send(leaderboard);
    });
};
module.exports.config = {
    name: "leaderboard",
    description: "checks if server is online",
    usage: `${botconfig.setup.prefix}leaderboard`,
    accessableby: "Members",
    aliases: ['lb']
};
