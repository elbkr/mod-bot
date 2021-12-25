const {MessageEmbed} = require("discord.js");
module.exports = class ChannelCreate extends Event {
    constructor() {
        super({
            name: "channelCreate",
            once: false,
        });
    }
    async exec(channel) {
        if(!channel.guild) return;
        if(channel.type === "GUILD_NEWS_THREAD") return;
        if(channel.type === "GUILD_PUBLIC_THREAD") return;
        if(channel.type === "GUILD_PRIVATE_THREAD ") return;

        const data = await this.client.getGuild({ _id: channel.guild.id });

        if (data.logsChannel) {
            let logsChannel = await channel.guild.channels.fetch(data.logsChannel);
            if (logsChannel) {
                let emb = new MessageEmbed()
                    .setColor("#70ec46")
                    .setTitle("Channel Created")
                    .setDescription(`**${channel.name}** has been created`)
                    .addField(`Channel`, `${channel}`, true)
                    .setTimestamp();

                logsChannel.send({embeds: [emb]});
            }
        }
    }
};
