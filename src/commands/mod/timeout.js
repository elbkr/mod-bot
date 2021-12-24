const {MessageEmbed} = require('discord.js');
const ms = require('ms');

module.exports = class TimeOut extends Interaction {
    constructor() {
        super({
            name: "timeout",
            description: "Timeouts a user",
            options: [
                {
                    type: "6",
                    name: "user",
                    description: "The user to timeout",
                    required: true
                },
                {
                    type: "3",
                    name: "length",
                    description: "The length of the timeout",
                    required: true
                },
                {
                    type: "3",
                    name: "reason",
                    description: "The reason for the timeout",
                    required: true
                }
            ],
        });
    }
    async exec(int, data) {
        let isMod = data.modRoles.some((r) => int.member._roles.includes(r));

        if (!isMod && !int.member.permissions.has("MODERATE_MEMBERS")) {
            return int.reply({
                content: "You don't have permission to do that!",
                ephemeral: true,
            });
        }

        let member = int.options.getMember("user")
        let length = int.options.getString("length")
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
                content: "You can't timeout someone with a higher role than you!",
                ephemeral: true,
            });
        }


        if(member.communicationDisabledUntilTimestamp > 0) {
            return int.reply({
                content: "That user is already timed out!",
                ephemeral: true,
            });
        }

        if(!member.moderatable || !member.manageable) {
            return int.reply({
                content: "I can't timeout that user!",
                ephemeral: true,
            });
        }


        let time = ms(length);

        if(!time) {
            return int.reply({
                content: "Enter a valid time!",
                ephemeral: true,
            });
        }

        if(time > 2.419e+9) {
            return int.reply({
                content: "You can't timeout someone more than **28 days**!",
                ephemeral: true,
            });
        } else if(time < 1000) {
            return int.reply({
                content: "You can't timeout someone less than **1 second**!",
                ephemeral: true,
            });
        }

        await member.timeout(time, reason).then(async () => {
            if(data.modLogs) {
                let modChannel = await int.guild.channels.fetch(data.modLogs);
                if(modChannel) {
                    let embed = new MessageEmbed()
                        .setAuthor({name:`${int.user.username} ${int.member.nickname ? `(${int.member.nickname})` : ""}`, iconURL: `${int.user.avatarURL()}`})
                        .setTitle("User Timed out")
                        .setColor("#2f3136")
                        .setDescription(`Reason: ${reason}`)
                        .addFields(
                            {name: "User", value: `${member}`, inline: true},
                            {name: "Moderator", value:`${int.member}`, inline: true},
                            {name: "Time", value: `${length}`, inline: false}
                        )
                        .setTimestamp();
                    modChannel.send({embeds: [embed]});
                }
            }

            return int.reply({
                content: `${member} has been timed out for ${length}! Reason: **${reason}**`,
                ephemeral: true,
            });
        });

    }
};
