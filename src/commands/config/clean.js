const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clean')
        .setDescription('Deletes bot messages in the channel')
        .addIntegerOption(option =>
            option.setName('amount')
            .setDescription('The amount of messages to delete')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('filter')
            .setDescription('The filter to use')
            .setRequired(false)
            .addChoice('Bots', 'bots')
            .addChoice('Bot (Me)', 'me')
            .addChoice('Users', 'users')),
    async execute(interaction = new CommandInteraction, client) {
        if (!interaction.member.permissions.has("MANAGE_GUILD")) {
            return interaction.reply({
                content: "You don't have the required permissions to do this!",
                ephemeral: true,
            });
        }

        let amount = interaction.options.getInteger("amount");
        let filter = interaction.options.getString("filter");

        if (amount > 100) {
            return interaction.reply({
                content: "You can't delete more than 100 messages at the same time!",
                ephemeral: true,
            });
        }

        let messages = await interaction.channel.messages.fetch();
        let deleted = 0;

        messages.forEach((m) => {
            if (deleted >= amount) {
                return;
            }

            if (filter) {
                if (filter === "bots" && m.author.bot) {
                    if (m.deletable) {
                        m.delete().catch((err) => console.log(err));
                        deleted += 1;
                    }
                }

                if (filter === "me" && m.author.id === client.user.id) {
                    if (m.deletable) {
                        m.delete().catch((err) => console.log(err));
                        deleted += 1;
                    }
                }

                if (filter === "users" && !m.author.bot) {
                    if (m.deletable) {
                        m.delete().catch((err) => console.log(err));
                        deleted += 1;
                    }
                }
            } else {
                if (m.deletable) {
                    m.delete().catch((err) => console.log(err));
                    deleted += 1;
                }
            }
        });

        return interaction.reply({
            content: "Successfully deleted messages!",
            ephemeral: true,
        });
    },
};
