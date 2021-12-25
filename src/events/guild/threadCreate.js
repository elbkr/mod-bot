const {MessageEmbed} = require("discord.js");
module.exports = class ThreadCreate extends Event {
    constructor() {
        super({
            name: "threadCreate",
            once: false,
        });
    }
    async exec(thread) {

        const data = await this.client.getGuild({ _id: thread.guild.id });


        if(thread.type !== "GUILD_NEWS_THREAD" && thread.type !== "GUILD_PUBLIC_THREAD" && thread.type !== "GUILD_PRIVATE_THREAD ") return;

        if (data.logsChannel) {
            let channel = await thread.guild.channels.fetch(data.logsChannel);
            if (channel) {
                let emb = new MessageEmbed()
                    .setColor("#70ec46")
                    .setTitle("Thread created")
                    .setDescription(`${thread} has been created`)
                    .addField(`Thread`, `${thread}`, true)
                    .addField("Created by", `<@${thread.ownerId}>`, true)
                    .setTimestamp();

                channel.send({embeds: [emb]});
            }
        }
    }
};
