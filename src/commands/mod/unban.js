const {MessageEmbed} = require('discord.js');

module.exports = class Unban extends Interaction {
    constructor() {
        super({
            name: "unban",
            description: "Unbans a user from the server",
            options: [
                {
                    type: "3",
                    name: "user",
                    description: "The ID of the user to unban",
                    required: true
                },
                {
                    type: "3",
                    name: "reason",
                    description: "The reason for the unban",
                    required: true
                }
            ],
        });
    }
    async exec(int, data) {
        let isMod = data.modRoles.some((r) => int.member._roles.includes(r));

        if (!isMod && !int.member.permissions.has("BAN_MEMBERS") ) {
            return int.reply({
                content: "You don't have permission to do that!",
                ephemeral: true,
            });
        }

        let id = int.options.getString("user")
        let reason = int.options.getString("reason")


        let userIdRegex = /^[0-9]{17,18}$/;
        if(!userIdRegex.test(id)) {
            return int.reply({
                content: "Provide a valid user ID!",
                ephemeral: true,
            });
        }

        if(id === int.client.user.id) {
            return int.reply({
                content: "You can't moderate me!",
                ephemeral: true,
            });
        }else if(id === int.guild.ownerId) {
            return int.reply({
                content: "You can't moderate the server owner!",
                ephemeral: true,
            });
        }

        let isBan = await int.guild.bans.fetch(id);

        if(!isBan) {
            return int.reply({
                content: "That user is not banned!",
                ephemeral: true,
            });
        }

        await int.guild.members.unban(isBan.user, `${reason}`).then(async () => {
            if(data.modLogs) {
                let modChannel = await int.guild.channels.fetch(data.modLogs);
                if(modChannel) {
                    let embed = new MessageEmbed()
                        .setAuthor({name:`${int.user.username} ${int.member.nickname ? `(${int.member.nickname})` : ""}`, iconURL: `${int.user.avatarURL()}`})
                        .setTitle("User Unbanned")
                        .setColor("#2f3136")
                        .setDescription(`Reason: ${reason}`)
                        .addFields(
                            {name: "User", value: `${isBan.user}`, inline: true},
                            {name: "Moderator", value:`${int.member}`, inline: true},
                        )
                        .setTimestamp();
                    modChannel.send({embeds: [embed]});
                }
            }

            return int.reply({
                content: `${isBan.user} has been unbanned! Reason: **${reason}**`,
                ephemeral: true,
            });
        });

    }
};
