const warnings = require("../../models/Warns");
const paginationEmbed = require("../../utils/Pagination");
const {msToSeconds} = require("../../utils/Utils")
const {MessageEmbed, MessageButton} = require("discord.js")

module.exports = class Warns extends Interaction {
    constructor() {
        super({
            name: "warns",
            description: "Displays the warns of a user",
            options: [
                {
                    type: "6",
                    name: "user",
                    description: "The user to warn",
                    required: true,
                },
            ],
        });
    }
    async exec(int, data) {

        let isMod = data.modRoles.some((r) => int.member._roles.includes(r));

        if (!isMod && !int.member.permissions.has("MODERATE_MEMBERS")) {
            return int.reply({
                content: "You don't have permission to do that!",
                ephemeral: true,
            });
        }

        const member = int.options.getMember("user");

        let warning = await warnings.findOne({
            _id: member.user.id,
            guildID: int.guild.id,
        });

        if (!warning) {
            return int.reply({
                content: "That user doesn't have any warnings!",
                ephemeral: true,
            });
        }

        let btn1 = new MessageButton()
            .setCustomId("previousbtn")
            .setLabel("Previous")
            .setStyle("SECONDARY");

        const btn2 = new MessageButton()
            .setCustomId("nextbtn")
            .setLabel("Next")
            .setStyle("PRIMARY");

        let currentEmbedItems = [];
        let embedItemArray = [];
        let pages = [];

        let buttonList = [btn1, btn2];

        if (warning.warns.length > 5) {
            warning.warns.forEach((w, i) => {
                w.index = i + 1;
                if (currentEmbedItems.length < 5) currentEmbedItems.push(w);
                else {
                    embedItemArray.push(currentEmbedItems);
                    currentEmbedItems = [w];
                }

            });
            embedItemArray.push(currentEmbedItems);

            embedItemArray.forEach((x) => {
                let warns = x
                    .map((w) => `**ID: ${w.index}**\n**Reason:** ${w.reason}\n**Date:** <t:${msToSeconds(w.date)}>\n**Mod:** <@${w.moderator}>`)
                    .join("\n\n");
                let emb = new MessageEmbed()
                    .setTitle(`${member.user.username}'s warnings`)
                    .setColor("#2f3136")
                    .setThumbnail(member.user.avatarURL())
                    .setDescription(
                        `${warns}`
                    );
                pages.push(emb);
            });

            await paginationEmbed(int, pages, buttonList);
        } else {
            let warns = warning.warns
                .map((w, i) => `**ID: ${i + 1}**\n**Reason:** ${w.reason}\n**Date:** <t:${msToSeconds(w.date)}>\n**Mod:** <@${w.moderator}>`)
                .join("\n\n");

            let emb = new MessageEmbed()
                .setTitle(`${member.user.username}'s warnings`)
                .setColor("#2f3136")
                .setThumbnail(member.user.avatarURL())
                .setDescription(
                    `${warns}`
                )
                .setFooter("Page 1 / 1");

            return int.reply({embeds: [emb]})
        }
    }
};
