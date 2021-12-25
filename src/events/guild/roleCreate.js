const {MessageEmbed} = require("discord.js");
module.exports = class RoleCreate extends Event {
    constructor() {
        super({
            name: "roleCreate",
            once: false,
        });
    }
    async exec(role) {

        const data = await this.client.getGuild({ _id: role.guild.id });

        if (data.logsChannel) {
            let channel = await role.guild.channels.fetch(data.logsChannel);
            if (channel) {
                let emb = new MessageEmbed()
                    .setColor("#70ec46")
                    .setTitle("Role created")
                    .setDescription(`${role} created`)
                    .addField("Role", `${role}`, true)
                    .setTimestamp();

                channel.send({embeds: [emb]});
            }
        }
    }
};
