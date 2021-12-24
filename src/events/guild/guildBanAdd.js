const {MessageEmbed} = require("discord.js");

module.exports = class GuildBanAdd extends Event {
    constructor() {
        super({
            name: "guildBanAdd",
            once: false,
        });
    }
    async exec(ban) {
        const data = await this.client.getGuild({ _id: ban.guild.id });

        if (data.logsChannel) {
            let channel = await ban.guild.channels.fetch(data.logsChannel);
            if (channel) {
                    let emb = new MessageEmbed()
                        .setColor("#e15050")
                        .setAuthor({name:`${ban.user.username}`, iconURL: `${ban.user.avatarURL()}`})
                        .setTitle("User Banned")
                        .setDescription(`**${ban.user.tag}** has been banned`)
                        .addField(`User`, `${ban.user}`, true)
                        .addField(`Reason`, `${ban.reason ? `${ban.reason}` : "No reason provided"}`, true)
                        .setTimestamp();

                    channel.send({embeds: [emb]});
                }
            }
        }
};
