const {MessageEmbed} = require("discord.js");
module.exports = class ThreadUpdate extends Event {
    constructor() {
        super({
            name: "threadUpdate",
            once: false,
        });
    }
    async exec(oldThread, newThread) {

        if(oldThread.type !== "GUILD_NEWS_THREAD" && oldThread.type !== "GUILD_PUBLIC_THREAD" && oldThread.type !== "GUILD_PRIVATE_THREAD") return;

        const data = await this.client.getGuild({ _id: oldThread.guild.id });

        if(data.logsChannel) {
            let channel = await oldThread.guild.channels.fetch(data.logsChannel);
            if (channel) {
                if (oldThread.name !== newThread.name) {
                    let emb = new MessageEmbed()
                        .setTitle("Thread updated")
                        .setColor("#3ccffa")
                        .setDescription(`${oldThread} name has been updated`)
                        .addField("Old name", `${oldThread.name}`, true)
                        .addField("New name", `${newThread.name}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]})
                }
                if(oldThread.type !== newThread.type) {
                    let emb = new MessageEmbed()
                        .setTitle("Thread updated")
                        .setColor("#3ccffa")
                        .setDescription(`${oldThread} type has been updated`)
                        .addField("Old type", `${oldThread.type}`, true)
                        .addField("New type", `${newThread.type}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]})

                }
                if(oldThread.rateLimitPerUser !== newThread.rateLimitPerUser) {
                    let emb = new MessageEmbed()
                        .setTitle("Thread updated")
                        .setColor("#3ccffa")
                        .setDescription(`${oldThread} rate limit has been updated`)
                        .addField("Old rate limit", `${oldThread.rateLimitPerUser}`, true)
                        .addField("New rate limit", `${newThread.rateLimitPerUser}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]})

                }
                if(oldThread.parent !== newThread.parent) {
                    let emb = new MessageEmbed()
                        .setTitle("Thread updated")
                        .setColor("#3ccffa")
                        .setDescription(`${oldThread} parent has been updated`)
                        .addField("Old parent", `${oldThread.parent}`, true)
                        .addField("New parent", `${newThread.parent}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]})
                }
                if(oldThread.archived !== newThread.archived) {
                    let emb = new MessageEmbed()
                        .setTitle("Thread updated")
                        .setColor("#3ccffa")
                        .setDescription(`${oldThread} archived has been updated`)
                        .addField("Old archived", `${oldThread.archived}`, true)
                        .addField("New archived", `${newThread.archived}`, true)
                        .setTimestamp()

                    channel.send({embeds: [emb]})
                }
            }
        }
    }
};
