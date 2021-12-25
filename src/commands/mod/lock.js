const {MessageEmbed} = require('discord.js');

module.exports = class Lock extends Interaction {
    constructor() {
        super({
            name: "lock",
            description: "Locks a channel",
            options: [
                {
                    type: "7",
                    name: "channel",
                    description: "The channel to lock",
                    required: true
                },
                {
                    type: "3",
                    name: "reason",
                    description: "The reason for the lock",
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
        let reason = int.options.getString("reason")

       if(!channel.permissionsFor(int.guild.roles.everyone).has("SEND_MESSAGES")) {
           return int.reply({
               content: "That channel is already locked!",
               ephemeral: true,
           });
       }

        await channel.edit({
            permissionOverwrites: [
                {
                    id: int.guild.id,
                    deny: ["SEND_MESSAGES"],
                },
            ]
        }, reason).then(async (c) => {
            if(data.modLogs) {
                let modChannel = await int.guild.channels.fetch(data.modLogs);
                if(modChannel) {
                    let embed = new MessageEmbed()
                        .setAuthor({name:`${int.user.username} ${int.member.nickname ? `(${int.member.nickname})` : ""}`, iconURL: `${int.user.avatarURL()}`})
                        .setTitle("Channel locked")
                        .setColor("#2f3136")
                        .setDescription(`Reason: ${reason}`)
                        .addFields(
                            {name: "Channel", value: `${c}`, inline: true},
                            {name: "Moderator", value:`${int.member}`, inline: true},
                        )
                        .setTimestamp();
                    modChannel.send({embeds: [embed]});
                }
            }

            return int.reply({
                content: `${channel} has been locked! Reason: **${reason}**`,
                ephemeral: true,
            });
        });

    }
};
