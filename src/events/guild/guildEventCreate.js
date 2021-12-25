const {MessageEmbed} = require("discord.js");
module.exports = class GuildScheduledEventCreate extends Event {
    constructor() {
        super({
            name: "guildScheduledEventCreate",
            once: false,
        });
    }
    async exec(guildScheduledEvent) {

        const data = await this.client.getGuild({ _id: guildScheduledEvent.guild.id });

        if (data.logsChannel) {
            let logsChannel = await guildScheduledEvent.guild.channels.fetch(data.logsChannel);
            if (logsChannel) {
                let emb = new MessageEmbed()
                    .setColor("#70ec46")
                    .setTitle("Event Created")
                    .setDescription(`**${guildScheduledEvent.name}** has been created: ${guildScheduledEvent.description}`)
                    .addField("Event Type", `${guildScheduledEvent.type}`, true)
                    .addField("Created by", `${guildScheduledEvent.creator}`, true)
                    .addField("Start Date", `${guildScheduledEvent.scheduledStartAt}`, true)
                    .addField("End Date", `${guildScheduledEvent.scheduledEndAt ? guildScheduledEvent.scheduledEndAt : "None"}`, true)
                    .setTimestamp();

                if(guildScheduledEvent.channel) {
                    emb.addField("Channel", `${guildScheduledEvent.channel}`, true);
                }

                logsChannel.send({embeds: [emb]});
            }
        }
    }
};
