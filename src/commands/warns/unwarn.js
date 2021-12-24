const warnings = require("../../models/Warns");
const {MessageEmbed} = require("discord.js");

module.exports = class Unwarn extends Interaction {
    constructor() {
        super({
            name: "unwarn",
            description: "Unwarns a user",
            options: [
                {
                    type: "6",
                    name: "user",
                    description: "The user to warn",
                    required: true,
                },
                {
                    type: "4",
                    name: "warn",
                    description: "The ID of the warn to remove",
                    required: true,
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

        const member = int.options.getMember("user");
        const warn = int.options.getInteger("warn");

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

        if(!warning || !warning.warns.length) {
            return int.reply({
                content: "That user doesn't have any warnings!",
                ephemeral: true,
            });
        }

        if(warn <= 0 || warn > warning.warns.length) {
            return int.reply({
                content: "Provide a valid warn ID!",
                ephemeral: true,
            });
        }

        let old = warning.warns.find((w, i) => i === warn - 1);


        let index =  warning.warns.indexOf(old);

        if(data.modLogs) {
            let modChannel = await int.guild.channels.fetch(data.modLogs);
            if (modChannel) {
                let embed = new MessageEmbed()
                    .setAuthor({
                        name: `${int.user.username} ${int.member.nickname ? `(${int.member.nickname})` : ""}`,
                        iconURL: `${int.user.avatarURL()}`
                    })
                    .setTitle("User unwarned")
                    .setColor("#2f3136")
                    .setDescription(`Warn: ${old.reason}`)
                    .addFields(
                        {name: "User", value: `${member}`, inline: true},
                        {name: "Moderator", value: `${int.member}`, inline: true},
                    )
                    .setTimestamp();
                modChannel.send({embeds: [embed]});
            }
        }
        warning.warns.splice(index, 1);

        await warning.save();


        return int.reply({
            content: `Successfully removed warn \`${warn}\` from ${member}!`,
            ephemeral: true,
        });
    }
};
