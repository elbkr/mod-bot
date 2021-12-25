const {MessageEmbed} = require("discord.js");
module.exports = class ThreadDelete extends Event {
    constructor() {
        super({
            name: "threadDelete",
            once: false,
        });
    }
    async exec(thread) {

        if(thread.type !== "GUILD_NEWS_THREAD" && thread.type !== "GUILD_PUBLIC_THREAD" && thread.type !== "GUILD_PRIVATE_THREAD ") return;

        const data = await this.client.getGuild({ _id: thread.guild.id });

        if (data.logsChannel) {
            let channel = await thread.guild.channels.fetch(data.logsChannel);
            if (channel) {
                let emb = new MessageEmbed()
                    .setColor("#ea4e4e")
                    .setTitle("Thread deleted")
                    .setDescription(`**${thread.name}** has been deleted`)
                    .addField(`Thread`, `${thread.name}`, true)
                    .setTimestamp();

                channel.send({embeds: [emb]});
            }
        }
    }
};
