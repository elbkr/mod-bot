const warnings = require("../../models/Warns");
const {MessageEmbed} = require("discord.js");

module.exports = class Warn extends Interaction {
    constructor() {
        super({
            name: "warn",
            description: "Warns a user",
            options: [
                {
                    type: "6",
                    name: "user",
                    description: "The user to warn",
                    required: true,
                },
                {
                    type: "3",
                    name: "reason",
                    description: "The reason for the warning",
                    required: true,
                },
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

        const member = int.options.getMember("user");
        const reason = int.options.getString("reason");


        if(member.user.id === int.user.id) {
            return int.reply({
                content: "You can't warn yourself!",
                ephemeral: true,
            });
        } else if(member.user.id === int.client.user.id) {
            return int.reply({
                content: "You can't warn me!",
                ephemeral: true,
            });
        } else if(member.user.id === int.guild.ownerId) {
            return int.reply({
                content: "You can't warn the server owner!",
                ephemeral: true,
            });
        } else if(int.member.roles.highest.position < member.roles.highest.position) {
            return int.reply({
                content: "You can't warn someone with a higher role than you!",
                ephemeral: true,
            });
        }

        let warning = await warnings.findOne({
            _id: member.user.id,
            guildID: int.guild.id,
        });

        if(warning) {
            warning.warns.push({
                moderator: int.user.id,
                reason: reason,
                date: Date.now(),
            });

            await warning.save();

        } else {
            warning = new warnings({
                _id: member.user.id,
                guildID: int.guild.id,
                warns: [{
                    moderator: int.user.id,
                    reason: reason,
                    date: Date.now(),
                }],
            });
            await warning.save();
        }

        if(data.modLogs) {
            let modChannel = await int.guild.channels.fetch(data.modLogs);
            if (modChannel) {
                let embed = new MessageEmbed()
                    .setAuthor({
                        name: `${int.user.username} ${int.member.nickname ? `(${int.member.nickname})` : ""}`,
                        iconURL: `${int.user.avatarURL()}`
                    })
                    .setTitle("User warned")
                    .setColor("#2f3136")
                    .setDescription(`Reason: ${reason}`)
                    .addFields(
                        {name: "User", value: `${member}`, inline: true},
                        {name: "Moderator", value: `${int.member}`, inline: true},
                    )
                    .setTimestamp();
                modChannel.send({embeds: [embed]});
            }
        }
        return int.reply({
            content: `${member} has been warned! Reason: **${reason}**`,
            ephemeral: true,
        });
    }
};
