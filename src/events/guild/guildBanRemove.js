const {MessageEmbed} = require("discord.js");

module.exports = class GuildBanRemove extends Event {
    constructor() {
        super({
            name: "guildBanRemove",
            once: false,
        });
    }
    async exec(ban) {
        const data = await this.client.getGuild({ _id: ban.guild.id });

        if (data.logsChannel) {
            let channel = await ban.guild.channels.fetch(data.logsChannel);
            if (channel) {
                let emb = new MessageEmbed()
                    .setColor("#70ec46")
                    .setAuthor({name:`${ban.user.username}`, iconURL: `${ban.user.avatarURL()}`})
                    .setTitle("User Unbanned")
                    .setDescription(`**${ban.user.tag}** has been unbanned`)
                    .addField(`User`, `${ban.user}`, true)
                    .addField(`Reason`, `${ban.reason ? ban.reason : "No reason provided"}`, true)
                    .setTimestamp();

                channel.send({embeds: [emb]});
            }
        }
    }
};
