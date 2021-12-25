const {MessageEmbed} = require('discord.js');

module.exports = class Mute extends Interaction {
    constructor() {
        super({
            name: "mute",
            description: "Mutes a user in a voice channel",
            options: [
                {
                    type: "6",
                    name: "user",
                    description: "The user to mute",
                    required: true
                },
                {
                    type: "3",
                    name: "reason",
                    description: "The reason for the mute",
                    required: true
                }
            ],
        });
    }
    async exec(int, data) {
        let isMod = data.modRoles.some((r) => int.member._roles.includes(r));

        if (!isMod && !int.member.permissions.has("MUTE_MEMBERS") ) {
            return int.reply({
                content: "You don't have permission to do that!",
                ephemeral: true,
            });
        }

        let member = int.options.getMember("user")
        let reason = int.options.getString("reason")

        if(member.user.id === int.user.id) {
            return int.reply({
                content: "You can't moderate yourself!",
                ephemeral: true,
            });
        } else if(member.user.id === int.client.user.id) {
            return int.reply({
                content: "You can't moderate me!",
                ephemeral: true,
            });
        } else if(member.user.id === int.guild.ownerId) {
            return int.reply({
                content: "You can't moderate the server owner!",
                ephemeral: true,
            });
        }

        if(int.member.roles.highest.position < member.roles.highest.position) {
            return int.reply({
                content: "You can't mute someone with a higher role than you!",
                ephemeral: true,
            });
        }


        if(!member.manageable) {
            return int.reply({
                content: "I can't mute that user!",
                ephemeral: true,
            });
        }

        if(!member.voice.channel) {
            return int.reply({
                content: "That user isn't in a voice channel!",
                ephemeral: true,
            });
        }

        if(member.voice.selfMute || member.voice.mute) {
            return int.reply({
                content: "That user is already muted!",
                ephemeral: true,
            });
        }

        await member.voice.setMute(true, reason).then(async () => {
            if(data.modLogs) {
                let modChannel = await int.guild.channels.fetch(data.modLogs);
                if(modChannel) {
                    let embed = new MessageEmbed()
                        .setAuthor({name:`${int.user.username} ${int.member.nickname ? `(${int.member.nickname})` : ""}`, iconURL: `${int.user.avatarURL()}`})
                        .setTitle("User muted")
                        .setColor("#2f3136")
                        .setDescription(`Reason: ${reason}`)
                        .addFields(
                            {name: "User", value: `${member}`, inline: true},
                            {name: "Moderator", value:`${int.member}`, inline: true},
                        )
                        .setTimestamp();
                    modChannel.send({embeds: [embed]});
                }
            }

            return int.reply({
                content: `${member} has been muted! Reason: **${reason}**`,
                ephemeral: true,
            });
        });

    }
};
