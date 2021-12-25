const { MessageEmbed } = require("discord.js");
const {msToSeconds} = require("../../utils/Utils");

module.exports = class GuildMemberUpdate extends Event {
    constructor() {
        super({
            name: "guildMemberUpdate",
            once: false,
        });
    }
    async exec(oldMember, newMember) {

        const data = await this.client.getGuild({ _id: newMember.guild.id });

        let oldTimeOut = oldMember.communicationDisabledUntilTimestamp;
        let newTimeOut = newMember.communicationDisabledUntilTimestamp;

        if (data.logsChannel) {
            let channel = await oldMember.guild.channels.fetch(data.logsChannel);
            if (channel) {
                if (oldTimeOut !== newTimeOut && newTimeOut != null && newTimeOut > Date.now()) {

                    let emb = new MessageEmbed()
                        .setColor("#ea4e4e")
                        .setAuthor({name:`${newMember.user.username} ${newMember.nickname ? `(${newMember.nickname})` : ""}`, iconURL: `${newMember.user.avatarURL()}`})
                        .setTitle("User Timed Out")
                        .setDescription(`${newMember} has been timed out`)
                        .addField("Until", `<t:${msToSeconds(newTimeOut)}>`)
                        .setTimestamp();

                    channel.send({embeds: [emb]});
                }
                if(oldTimeOut !== newTimeOut && newTimeOut == null) {

                    let emb = new MessageEmbed()
                        .setColor("#70ec46")
                        .setAuthor({name:`${newMember.user.username} ${newMember.nickname ? `(${newMember.nickname})` : ""}`, iconURL: `${newMember.user.avatarURL()}`})
                        .setTitle("User Time Out ended")
                        .setDescription(`${newMember} time out has ended`)
                        .setTimestamp();

                    channel.send({embeds: [emb]});
                }
                if(oldMember.nickname !== newMember.nickname) {
                    let emb = new MessageEmbed()
                        .setColor("#3ccffa")
                        .setTitle("User updated")
                        .setDescription(`${newMember} nickname has been updated`)
                        .addField("Old nickname", `${oldMember.nickname ? oldMember.nickname : "None"}`)
                        .addField("New nickname", `${newMember.nickname ? newMember.nickname : "None"}`)
                        .setTimestamp();

                    channel.send({embeds: [emb]});
                }
                if(oldMember.avatar !== newMember.avatar) {
                    let emb = new MessageEmbed()
                        .setColor("#3ccffa")
                        .setTitle("User updated")
                        .setDescription(`${newMember} server avatar has been updated`)
                        .addField("Old avatar", `[Click here](${oldMember.avatarURL()})`)
                        .addField("New avatar", `[Click here](${newMember.avatarURL()})`)
                        .setTimestamp();

                    channel.send({embeds: [emb]});
                }
                if(oldMember.user.username !== newMember.user.username) {
                    let emb = new MessageEmbed()
                        .setColor("#3ccffa")
                        .setTitle("User updated")
                        .setDescription(`${newMember} username has been updated`)
                        .addField("Old username", `${oldMember.user.username}`)
                        .addField("New username", `${newMember.user.username}`)
                        .setTimestamp();

                    channel.send({embeds: [emb]});
                }
                if(oldMember.roles.cache.size !== newMember.roles.cache.size) {
                    let difference;
                    if(oldMember.roles.cache.size > newMember.roles.cache.size) {

                        difference = oldMember.roles.cache.filter(r => !newMember.roles.cache.has(r.id));

                        let emb = new MessageEmbed()
                            .setColor("#3ccffa")
                            .setTitle("User updated")
                            .setDescription(`${newMember} role has been removed`)
                            .addField("Role", `${difference.map(r => r).join(" ")}`)
                            .setTimestamp();

                        channel.send({embeds: [emb]});
                    } else {
                        difference = newMember.roles.cache.filter(r => !oldMember.roles.cache.has(r.id));

                        let emb = new MessageEmbed()
                            .setColor("#3ccffa")
                            .setTitle("User updated")
                            .setDescription(`${newMember} role has been added`)
                            .addField("Role", `${difference.map(r => r).join(" ")}`)
                            .setTimestamp();

                        channel.send({embeds: [emb]});
                    }


                }
            }
        }
    }
};
