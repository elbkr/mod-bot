const {MessageEmbed} = require("discord.js");
module.exports = class GuildMemberRemove extends Event {
  constructor() {
    super({
      name: "guildMemberRemove",
      once: false,
    });
  }
  async exec(member) {

    const data = await this.client.getGuild({ _id: member.guild.id });

    if (data.logsChannel) {
      let channel = await member.guild.channels.fetch(data.logsChannel);
      if (channel) {
        let emb = new MessageEmbed()
            .setColor("#ea4e4e")
            .setAuthor({name: member.user.username, iconURL: member.user.avatarURL()})
            .setTitle("User left")
            .setDescription(`${member} left the server`)
            .addField("User", `${member}`, true)
            .addField("Created at", `${member.user.createdAt}`, true)
            .setTimestamp();

        channel.send({embeds: [emb]});
      }
    }
  }
};
