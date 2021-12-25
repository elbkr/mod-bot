const {MessageEmbed} = require("discord.js");
module.exports = class GuildMemberAdd extends Event {
    constructor() {
        super({
            name: "guildMemberAdd",
            once: false,
        });
    }
        async exec(member) {

        const data = await this.client.getGuild({ _id: member.guild.id });

        if (data.logsChannel) {
            let channel = await member.guild.channels.fetch(data.logsChannel);
            if (channel) {
                let emb = new MessageEmbed()
                    .setColor("#70ec46")
                    .setAuthor({name: member.user.username, iconURL: member.user.avatarURL()})
                    .setTitle("User Joined")
                    .setDescription(`${member} joined the server`)
                    .addField("User", `${member}`, true)
                    .addField("Created at", `${member.user.createdAt}`, true)
                    .setTimestamp();

                channel.send({embeds: [emb]});
            }
        }
    }
};
