const {MessageEmbed} = require("discord.js");
module.exports = class ChannelUpdate extends Event {
    constructor() {
        super({
            name: "channelUpdate",
            once: false,
        });
    }
    async exec(oldChannel, newChannel) {
        if(!oldChannel.guild) return;
        if(oldChannel.type === "GUILD_NEWS_THREAD") return;
        if(oldChannel.type === "GUILD_PUBLIC_THREAD") return;
        if(oldChannel.type === "GUILD_PRIVATE_THREAD ") return;

        const data = await this.client.getGuild({ _id: oldChannel.guild.id });

        if(data.logsChannel) {
            let channel = await oldChannel.guild.channels.fetch(data.logsChannel);
            if (channel) {
                if (oldChannel.name !== newChannel.name) {
                    let emb = new MessageEmbed()
                        .setTitle('Channel updated')
                        .setColor("#3ccffa")
                        .setDescription(`${oldChannel} name has been updated`)
                        .addField("Old name", `${oldChannel.name}`, true)
                        .addField("New name", `${newChannel.name}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]})

                }
                if(oldChannel.topic !== newChannel.topic) {
                    let emb = new MessageEmbed()
                        .setTitle('Channel updated')
                        .setColor("#3ccffa")
                        .setDescription(`${oldChannel} topic has been updated`)
                        .addField("Old topic", `${oldChannel.topic ? oldChannel.topic : "None"}`, true)
                        .addField("New topic", `${newChannel.topic ? newChannel.topic : "None"}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]})

                }
                if(oldChannel.position !== newChannel.position) {
                    let emb = new MessageEmbed()
                        .setTitle('Channel updated')
                        .setColor("#3ccffa")
                        .setDescription(`${oldChannel} position has been updated`)
                        .addField("Old position", `${oldChannel.position}`, true)
                        .addField("New position", `${newChannel.position}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]})

                }
                if(oldChannel.type !== newChannel.type) {
                    let emb = new MessageEmbed()
                        .setTitle('Channel updated')
                        .setColor("#3ccffa")
                        .setDescription(`${oldChannel} type has been updated`)
                        .addField("Old type", `${oldChannel.type}`, true)
                        .addField("New type", `${newChannel.type}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]})

                }
                if(oldChannel.nsfw !== newChannel.nsfw) {
                    let emb = new MessageEmbed()
                        .setTitle('Channel updated')
                        .setColor("#3ccffa")
                        .setDescription(`${oldChannel} nsfw type has been updated`)
                        .addField("Old nsfw", `${oldChannel.nsfw}`, true)
                        .addField("New nsfw", `${newChannel.nsfw}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]})

                }
                if(oldChannel.bitrate !== newChannel.bitrate) {
                    let emb = new MessageEmbed()
                        .setTitle('Channel updated')
                        .setColor("#3ccffa")
                        .setDescription(`${oldChannel} bitrate has been updated`)
                        .addField("Old bitrate", `${oldChannel.bitrate}`, true)
                        .addField("New bitrate", `${newChannel.bitrate}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]})

                }
                if(oldChannel.userLimit !== newChannel.userLimit) {
                    let emb = new MessageEmbed()
                        .setTitle('Channel updated')
                        .setColor("#3ccffa")
                        .setDescription(`${oldChannel} user limit has been updated`)
                        .addField("Old limit", `${oldChannel.userLimit}`, true)
                        .addField("New limit", `${newChannel.userLimit}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]})

                }
                if(oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser) {
                    let emb = new MessageEmbed()
                        .setTitle('Channel updated')
                        .setColor("#3ccffa")
                        .setDescription(`${oldChannel} rate limit has been updated`)
                        .addField("Old rate limit", `${oldChannel.rateLimitPerUser ? oldChannel.rateLimitPerUser : "None"}`, true)
                        .addField("New rate limit", `${newChannel.rateLimitPerUser ? newChannel.rateLimitPerUser : "None"}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]})

                }
                if(oldChannel.parent !== newChannel.parent) {
                    let emb = new MessageEmbed()
                        .setTitle('Channel updated')
                        .setColor("#3ccffa")
                        .setDescription(`${oldChannel} parent has been updated`)
                        .addField("Old parent", `${oldChannel.parent}`, true)
                        .addField("New parent", `${newChannel.parent}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]})
                }
            }
        }
    }
};
