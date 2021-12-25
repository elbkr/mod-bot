const {MessageEmbed} = require("discord.js");
module.exports = class ChannelDelete extends Event {
  constructor() {
    super({
      name: "channelDelete",
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
            .setColor("#e15050")
            .setTitle("Channel Deleted")
            .setDescription(`**${channel.name}** has been deleted`)
            .addField(`Channel`, `${channel.name}`, true)
            .setTimestamp();

        logsChannel.send({embeds: [emb]});
      }
    }

    if (data.modLogs && data.modLogs === channel.id) {
      data.modLogs = undefined;
      await data.save();
    }
    if (data.logsChannel && data.logsChannel === channel.id) {
      data.logsChannel = undefined;
      await data.save();
    }
  }
};
