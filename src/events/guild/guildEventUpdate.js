const {MessageEmbed} = require("discord.js");
module.exports = class GuildScheduledEventUpdate extends Event {
    constructor() {
        super({
            name: "guildScheduledEventUpdate",
            once: false,
        });
    }
    async exec(oldEvent, newEvent) {

        const data = await this.client.getGuild({ _id: oldEvent.guild.id });

        if (data.logsChannel) {
            let channel = await oldEvent.guild.channels.fetch(data.logsChannel);
            if (channel) {
                if(oldEvent.name !== newEvent.name) {
                    let emb = new MessageEmbed()
                        .setColor("#3ccffa")
                        .setTitle("Event Updated")
                        .setDescription(`[${newEvent.name}](${newEvent}) Event name has been updated`)
                        .addField("Old name", oldEvent.name, true)
                        .addField("New name", newEvent.name, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]});
                }
                if(oldEvent.channel !== newEvent.channel) {
                    let emb = new MessageEmbed()
                        .setColor("#3ccffa")
                        .setTitle("Event Updated")
                        .setDescription(`[${newEvent.name}](${newEvent}) Event channel has been updated`)
                        .addField("Old channel", `${oldEvent.channel ? oldEvent.channel : "None"}`, true)
                        .addField("New channel",`${newEvent.channel ? newEvent.channel : "None"}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]});
                }
                if(oldEvent.scheduledStartAt !== newEvent.scheduledStartAt) {
                    let emb = new MessageEmbed()
                        .setColor("#3ccffa")
                        .setTitle("Event Updated")
                        .setDescription(`[${newEvent.name}](${newEvent}) Event start date has been updated`)
                        .addField("Old date",`${oldEvent.scheduledStartAt ? oldEvent.scheduledStartAt : "None"}`, true)
                        .addField("New date", `${newEvent.scheduledStartAt ? newEvent.scheduledStartAt : "None"}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]});
                }
                if(oldEvent.scheduledEndAt !== newEvent.scheduledEndAt) {
                    let emb = new MessageEmbed()
                        .setColor("#3ccffa")
                        .setTitle("Event Updated")
                        .setDescription(`[${newEvent.name}](${newEvent}) Event end date has been updated`)
                        .addField("Old date", `${oldEvent.scheduledEndAt ? oldEvent.scheduledEndAt : "None"}`, true)
                        .addField("New date", `${newEvent.scheduledEndAt ? newEvent.scheduledEndAt : "None"}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]});
                }
                if(oldEvent.description !== newEvent.description) {
                    let emb = new MessageEmbed()
                        .setColor("#3ccffa")
                        .setTitle("Event Updated")
                        .setDescription(`[${newEvent.name}](${newEvent}) Event description has been updated`)
                        .addField("Old description", `${oldEvent.description ? oldEvent.description : "None"}`, true)
                        .addField("New description", `${newEvent.description ? newEvent.description : "None"}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]});
                }
                if(oldEvent.status !== newEvent.status) {
                    let emb = new MessageEmbed()
                        .setColor("#3ccffa")
                        .setTitle("Event Updated")
                        .setDescription(`[${newEvent.name}](${newEvent}) Event status has been updated`)
                        .addField("Old status", `${oldEvent.status}`, true)
                        .addField("New status", `${newEvent.status}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]});
                }
                if(oldEvent.entityType !== newEvent.entityType) {
                    let emb = new MessageEmbed()
                        .setColor("#3ccffa")
                        .setTitle("Event Updated")
                        .setDescription(`[${newEvent.name}](${newEvent}) Event type has been updated`)
                        .addField("Old type", `${oldEvent.entityType}`, true)
                        .addField("New type", `${newEvent.entityType}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]});
                }
                if(oldEvent.entityMetadata !== newEvent.entityMetadata) {
                    let emb = new MessageEmbed()
                        .setColor("#3ccffa")
                        .setTitle("Event Updated")
                        .setDescription(`[${newEvent.name}](${newEvent}) Event location has been updated`)
                        .addField("Old location", `${oldEvent.entityMetadata?.location ? oldEvent.entityMetadata.location : "None"}`, true)
                        .addField("New location", `${newEvent.entityMetadata?.location ? newEvent.entityMetadata.location : "None"}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]});
                }
                if(oldEvent.privacyLevel !== newEvent.privacyLevel) {
                    let emb = new MessageEmbed()
                        .setColor("#3ccffa")
                        .setTitle("Event Updated")
                        .setDescription(`[${newEvent.name}](${newEvent}) Event privacy level has been updated`)
                        .addField("Old level", `${oldEvent.privacyLevel}`, true)
                        .addField("New level", `${newEvent.privacyLevel}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]});
                }
            }
        }
    }
};
