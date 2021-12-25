const {MessageEmbed} = require("discord.js");
module.exports = class GuildScheduledEventUserAdd extends Event {
    constructor() {
        super({
            name: "guildScheduledEventUserAdd",
            once: false,
        });
    }
    async exec(guildScheduledEvent, user) {

        const data = await this.client.getGuild({ _id: guildScheduledEvent.guild.id });

        if (data.logsChannel) {
            let channel = await guildScheduledEvent.guild.channels.fetch(data.logsChannel);
            if (channel) {
                let emb = new MessageEmbed()
                    .setColor("#70ec46")
                    .setTitle("Event user added")
                    .setDescription(`**${guildScheduledEvent.name}** Event user has been added`)
                    .addField("Event", `${guildScheduledEvent.name}`, true)
                    .addField("User", `${user}`, true)
                    .setTimestamp();

                channel.send({embeds: [emb]});
            }
        }
    }
};
