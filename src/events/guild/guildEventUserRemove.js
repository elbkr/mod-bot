const {MessageEmbed} = require("discord.js");
module.exports = class GuildScheduledEventUserRemove extends Event {
    constructor() {
        super({
            name: "guildScheduledEventUserRemove",
            once: false,
        });
    }
    async exec(guildScheduledEvent, user) {

        const data = await this.client.getGuild({ _id: guildScheduledEvent.guild.id });

        if (data.logsChannel) {
            let channel = await guildScheduledEvent.guild.channels.fetch(data.logsChannel);
            if (channel) {
                let emb = new MessageEmbed()
                    .setColor("#ea4e4e")
                    .setTitle("Event user removed")
                    .setDescription(`**${guildScheduledEvent.name}** Event user has been removed`)
                    .addField("Event", `${guildScheduledEvent.name}`, true)
                    .addField("User", `${user}`, true)
                    .setTimestamp();

                channel.send({embeds: [emb]});
            }
        }
    }
};
