const {MessageEmbed} = require("discord.js");
module.exports = class GuildScheduledEventDelete extends Event {
    constructor() {
        super({
            name: "guildScheduledEventDelete",
            once: false,
        });
    }
    async exec(guildScheduledEvent) {

        const data = await this.client.getGuild({ _id: guildScheduledEvent.guild.id });

        if (data.logsChannel) {
            let logsChannel = await guildScheduledEvent.guild.channels.fetch(data.logsChannel);
            if (logsChannel) {
                let emb = new MessageEmbed()
                    .setColor("#ea4e4e")
                    .setTitle("Event Deleted")
                    .setDescription(`**${guildScheduledEvent.name}** has been deleted: ${guildScheduledEvent.description}`)
                    .addField("Event Type", `${guildScheduledEvent.type}`, true)
                    .addField("Created by", `${guildScheduledEvent.creator}`, true)
                    .addField("Start Date", `${guildScheduledEvent.scheduledStartAt}`, true)
                    .addField("End Date", `${guildScheduledEvent.scheduledEndAt}`, true)
                    .setTimestamp();

                if(guildScheduledEvent.channel) {
                    emb.addField("Channel", `${guildScheduledEvent.channel}`, true);
                }
                logsChannel.send({embeds: [emb]});
            }
        }
    }
};
