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
                        .setColor("#e15050")
                        .setAuthor({name:`${newMember.user.username} ${newMember.nickname ? `(${newMember.nickname})` : ""}`, iconURL: `${newMember.user.avatarURL()}`})
                        .setTitle("User Timed Out")
                        .setDescription(`${newMember} has been timed out`)
                        .addField("Until", `<t:${msToSeconds(newTimeOut)}>`)
                        .setTimestamp();

                    channel.send({embeds: [emb]});
                }
            }
        }
    }
};
