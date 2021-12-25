const { MessageEmbed } = require("discord.js");
module.exports = class RoleUpdate extends Event {
    constructor() {
        super({
            name: "roleUpdate",
            once: false,
        });
    }
    async exec(oldRole, newRole) {

        const data = await this.client.getGuild({ _id: newRole.guild.id });

        if (data.logsChannel) {
            let channel = await newRole.guild.channels.fetch(data.logsChannel);
            if (channel) {
            if(oldRole.name !== newRole.name) {
                    let emb = new MessageEmbed()
                        .setColor("#3ccffa")
                        .setTitle("Role updated")
                        .setDescription(`${newRole} name has been updated`)
                        .addField("Old name", `${oldRole.name}`)
                        .addField("New name", `${newRole.name}`)
                        .setTimestamp();

                    channel.send({embeds: [emb]});
                }
            if(oldRole.hexColor !== newRole.hexColor) {
                let emb = new MessageEmbed()
                    .setColor("#3ccffa")
                    .setTitle("Role updated")
                    .setDescription(`${newRole} color has been updated`)
                    .addField("Old color", `${oldRole.hexColor}`)
                    .addField("New color", `${newRole.hexColor}`)
                    .setTimestamp();

                channel.send({embeds: [emb]});
            }
            if(oldRole.hoist !== newRole.hoist) {
                let emb = new MessageEmbed()
                    .setColor("#3ccffa")
                    .setTitle("Role updated")
                    .setDescription(`${newRole} hoist has been updated`)
                    .addField("Old hoist", `${oldRole.hoist}`)
                    .addField("New hoist", `${newRole.hoist}`)
                    .setTimestamp();

                channel.send({embeds: [emb]});
            }
            if(oldRole.icon !== newRole.icon) {
                let emb = new MessageEmbed()
                    .setColor("#3ccffa")
                    .setTitle("Role updated")
                    .setDescription(`${newRole} icon has been updated`)
                    .addField("Old icon", `${oldRole.icon ? oldRole.iconURL : "None"}`)
                    .addField("New icon", `${newRole.icon ? newRole.iconURL : "None"}`)
                    .setTimestamp();

                channel.send({embeds: [emb]});
            }
            if(oldRole.mentionable !== newRole.mentionable) {
                let emb = new MessageEmbed()
                    .setColor("#3ccffa")
                    .setTitle("Role updated")
                    .setDescription(`${newRole} mentionable has been updated`)
                    .addField("Old mentionable", `${oldRole.mentionable}`)
                    .addField("New mentionable", `${newRole.mentionable}`)
                    .setTimestamp();

                channel.send({embeds: [emb]});
            }
            if(oldRole.position !== newRole.position) {
                let emb = new MessageEmbed()
                    .setColor("#3ccffa")
                    .setTitle("Role updated")
                    .setDescription(`${newRole} position has been updated`)
                    .addField("Old position", `${oldRole.position}`)
                    .addField("New position", `${newRole.position}`)
                    .setTimestamp();

                channel.send({embeds: [emb]});
            }
            }
        }
    }
};
