const {MessageEmbed} = require('discord.js');

module.exports = class Slowmode extends Interaction {
    constructor() {
        super({
            name: "slowmode",
            description: "Changes the slowmode of a text channel",
            options: [
                {
                    type: "7",
                    name: "channel",
                    description: "The channel to change the slowmode of",
                    required: true
                },
                {
                    type: "4",
                    name: "time",
                    description: "The time in seconds to set the slowmode to",
                    required: true
                },
                {
                    type: "3",
                    name: "reason",
                    description: "The reason for the change",
                    required: true
                }
            ],
        });
    }
    async exec(int, data) {
        let isMod = data.modRoles.some((r) => int.member._roles.includes(r));

        if (!isMod && !int.member.permissions.has("MANAGE_CHANNELS") ) {
            return int.reply({
                content: "You don't have permission to do that!",
                ephemeral: true,
            });
        }

        let channel = int.options.getChannel("channel");
        let time = int.options.getInteger("time");
        let reason = int.options.getString("reason")

        if(time < 0) {
            return int.reply({
                content: "The time must be greater than 0!",
                ephemeral: true,
            });
        } else if(time > 21600) {
            return int.reply({
                content: "The time must be less than 6 hours!",
                ephemeral: true,
            });
        }

        await channel.setRateLimitPerUser(time, reason).then(async (c) => {
            if(data.modLogs) {
                let modChannel = await int.guild.channels.fetch(data.modLogs);
                if(modChannel) {
                    let embed = new MessageEmbed()
                        .setAuthor({name:`${int.user.username} ${int.member.nickname ? `(${int.member.nickname})` : ""}`, iconURL: `${int.user.avatarURL()}`})
                        .setTitle("Channel slow mode changed")
                        .setColor("#2f3136")
                        .setDescription(`Reason: ${reason}`)
                        .addFields(
                            {name: "Channel", value: `${c}`, inline: true},
                            {name: "Time", value: `${time} seconds`, inline: true},
                            {name: "Moderator", value:`${int.member}`, inline: true},
                        )
                        .setTimestamp();
                    modChannel.send({embeds: [embed]});
                }
            }

            return int.reply({
                content: `Slow mode of ${channel} set to ${time} seconds! Reason: **${reason}**`,
                ephemeral: true,
            });
        });

    }
};
