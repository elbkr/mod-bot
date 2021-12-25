const {MessageEmbed} = require("discord.js");

module.exports = class RoleDelete extends Event {
  constructor() {
    super({
      name: "roleDelete",
      once: false,
    });
  }
  async exec(role) {
    const data = await this.client.getGuild({ _id: role.guild.id });

    let mod = data.modRoles.find((r) => r === role.id);
    if (mod) {
      let index = data.modRoles.indexOf(role.id);
      data.modRoles.splice(index, 1);
      await data.save();
    }

    if (data.logsChannel) {
      let channel = await role.guild.channels.fetch(data.logsChannel);
      if (channel) {
        let emb = new MessageEmbed()
            .setColor("#ea4e4e")
            .setTitle("Role deleted")
            .setDescription(`**${role.name}** deleted`)
            .addField("Role", `${role.name}`, true)
            .addField("Created at", `${role.createdAt}`, true)
            .setTimestamp();

        channel.send({embeds: [emb]});
      }
    }
  }
};
